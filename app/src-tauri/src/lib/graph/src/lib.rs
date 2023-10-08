use tauri::{
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime, Window,
};

use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

use etvr_utils::{errors::ETVResult, prelude::*};

use graph_rs_sdk::oauth::{AccessToken, OAuth};
use graph_rs_sdk::*;

use tauri_plugin_oauth::start;

const PLUGIN_NAME: &str = "tauri-plugin-graph-api";

static CLIENT_ID: &str = "<YOUR_CLIENT_ID>";
static CLIENT_SECRET: &str = "<YOUR_CLIENT_SECRET>";

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct AccessCode {
    code: String,
}

#[derive(Debug, Clone)]
pub struct User {
    pub name: String,
    pub email: String,
}

#[derive(Debug)]
pub struct GraphAPIPlugin<R: Runtime> {
    pub app_handle: AppHandle<R>,
    pub user: Option<User>,
    pub redirect_uri: Arc<Mutex<Option<String>>>,
    pub port: Arc<Mutex<Option<u16>>>,
}

impl<R: Runtime> Clone for GraphAPIPlugin<R> {
    fn clone(&self) -> Self {
        Self {
            app_handle: self.app_handle.clone(),
            user: self.user.clone(),
            redirect_uri: self.redirect_uri.clone(),
            port: self.port.clone(),
        }
    }
}

impl<R: Runtime> GraphAPIPlugin<R> {
    fn new(app_handle: AppHandle<R>) -> Self {
        Self {
            app_handle,
            user: None,
            redirect_uri: Arc::new(Mutex::new(None)),
            port: Arc::new(Mutex::new(Some(8000))),
        }
    }

    pub async fn set_and_req_access_code(self, access_code: AccessCode) -> GraphResult<()> {
        let mut oauth = self.oauth_client();
        // The response type is automatically set to token and the grant type is automatically
        // set to authorization_code if either of these were not previously set.
        // This is done here as an example.
        oauth.access_code(access_code.code.as_str());
        let mut request = oauth.build_async().authorization_code_grant();

        // Returns reqwest::Response
        let response = request.access_token().send().await?;
        println!("{:#?}", response);

        if response.status().is_success() {
            let mut access_token: AccessToken = response.json().await?;
            oauth.access_token(access_token);

            // If all went well here we can print out the OAuth config with the Access Token.
            println!("{:#?}", &oauth);
        } else {
            // See if Microsoft Graph returned an error in the Response body
            let result: reqwest::Result<serde_json::Value> = response.json().await;

            match result {
                Ok(body) => println!("{:#?}", body),
                Err(err) => println!("Error on deserialization:\n{:#?}", err),
            }
        }

        Ok(())
    }

    async fn handle_redirect(self, code_option: Option<AccessCode>) -> Result<Box<String>, Error> {
        match code_option {
            Some(access_code) => {
                // Print out the code for debugging purposes.
                println!("{:#?}", access_code);

                // Set the access code and request an access token.
                // Callers should handle the Result from requesting an access token
                // in case of an error here.
                self.set_and_req_access_code(access_code).await;

                // Generic login page response.
                Ok(Box::new(
                    "Successfully Logged In! You can close your browser.".to_string(),
                ))
            }
            None => Err(Error::new(
                "No access code was returned from the authorization server.".to_string(),
            )),
        }
    }

    fn oauth_client(self) -> OAuth {
        let mut oauth = OAuth::new();

        let redirect_uri = f!("http://localhost:{}", self.port.lock().unwrap().unwrap());

        oauth
            .client_id(CLIENT_ID)
            .client_secret(CLIENT_SECRET)
            .add_scope("files.read")
            .add_scope("files.readwrite")
            .add_scope("files.read.all")
            .add_scope("files.readwrite.all")
            .add_scope("offline_access")
            .redirect_uri(redirect_uri.as_str())
            .authorize_url("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")
            .access_token_url("https://login.microsoftonline.com/common/oauth2/v2.0/token")
            .refresh_token_url("https://login.microsoftonline.com/common/oauth2/v2.0/token")
            .response_type("code");
        oauth
    }

    /// # Example
    /// ```
    /// use graph_rs_sdk::*:
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///   start_server_main().await;
    /// }
    /// ```
    pub async fn start_server_main(&self) -> &Self {
        let mut oauth = self.clone().oauth_client();
        let mut request = oauth.build_async().authorization_code_grant();
        request.browser_authorization().open().unwrap();

        self
    }
}

#[tauri::command]
#[specta::specta]
async fn start_auth<R: Runtime>(app: AppHandle<R>) {
    info!("Starting local auth server");

    let app_handler = app.clone();

    let app = app_handler.clone();
    let binding = app.state::<GraphAPIPlugin<R>>();
    app_handler.listen_global("oauth://url", move |msg| {
        let url = msg.payload().unwrap().to_string();

        print!("URL: {}", url);

        let codeoption = Some(AccessCode {
            code: url.split("code=").collect::<Vec<&str>>()[1].to_string(),
        });

        println!("Code: {:#?}", codeoption);
        //
        //binding.handle_redirect(codeoption);
    });
    info!("Local auth server started");
}

/// A command to start the local auth server
/// ## Arguments
/// - `window` The window to send the redirect_uri to
/// ## Returns
/// - `port`: u16 - The port the server is running on
#[tauri::command]
#[specta::specta]
pub async fn start_server<R: Runtime>(app: AppHandle<R>, window: Window) -> Result<(), String> {
    let app_handler = app.clone();

    start_auth(app_handler.clone()).await;

    let mut port = app_handler
        .state::<GraphAPIPlugin<R>>()
        .port
        .lock()
        .unwrap()
        .unwrap();

    let port_ = start(move |url| {
        // Because of the unprotected localhost port, we must verify the URL here.
        // Preferebly send back only the token, or nothing at all if we can handle everything else in Rust.
        let _ = window.emit("redirect_uri", url);
    })
    .map_err(|err| err.to_string())?;

    port = port_;

    let result = app_handler
        .state::<GraphAPIPlugin<R>>()
        .start_server_main()
        .await;

    Ok(())
}

macro_rules! specta_builder {
    ($e:expr, Runtime) => {
        ts::builder()
            .commands(collect_commands![start_auth::<$e>, start_server::<$e>])
            .path(generate_plugin_path(PLUGIN_NAME))
            .config(specta::ts::ExportConfig::default().formatter(specta::ts::prettier))
        //.events(collect_events![RandomNumber])
    };
}

pub fn init<R: Runtime>() -> TauriPlugin<tauri::Wry> {
    //let plugin_utils = specta_builder!(R, Runtime).into_plugin_utils(PLUGIN_NAME);
    Builder::new(PLUGIN_NAME)
        //.invoke_handler(plugin_utils.invoke_handler)
        .setup(move |app| {
            let app = app.clone();

            //(plugin_utils.setup)(&app);

            let plugin = GraphAPIPlugin::new(app.app_handle());
            app.manage(plugin);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_auth, start_server])
        .build()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn export_types() {
        println!("Exporting types for plugin: {}", PLUGIN_NAME);
        println!("Export path: {}", generate_plugin_path(PLUGIN_NAME));

        assert_eq!(
            specta_builder!(tauri::Wry, Runtime)
                .export_for_plugin(PLUGIN_NAME)
                .ok(),
            Some(())
        );
    }
}
