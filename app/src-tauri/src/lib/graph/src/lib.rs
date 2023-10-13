//use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

use tauri::{
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime,
};

use etvr_utils::{errors::ETVResult, prelude::*};

use graph_rs_sdk::oauth::{AccessToken, OAuth};
//use graph_rs_sdk::*;

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
pub struct GraphAPIPlugin {
    pub user: Option<User>,
    pub redirect_uri: Arc<Mutex<Option<String>>>,
    pub port: Arc<Mutex<Option<u16>>>,
    pub code_ready: Arc<Mutex<bool>>,
    code: Arc<Mutex<Option<AccessCode>>>,
}

impl Clone for GraphAPIPlugin {
    fn clone(&self) -> GraphAPIPlugin {
        GraphAPIPlugin {
            user: self.user.clone(),
            redirect_uri: self.redirect_uri.clone(),
            port: self.port.clone(),
            code_ready: self.code_ready.clone(),
            code: self.code.clone(),
        }
    }
}

impl GraphAPIPlugin {
    fn new() -> Self {
        Self {
            user: None,
            redirect_uri: Arc::new(Mutex::new(Some("http://localhost".to_string()))),
            port: Arc::new(Mutex::new(None)),
            code_ready: Arc::new(Mutex::new(false)),
            code: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn set_and_req_access_code(self, access_code: AccessCode) -> ETVResult<()> {
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

    fn is_ready(&self) -> bool {
        return *self.code_ready.lock().unwrap();
    }

    fn set_code_ready(&self) {
        *self.code_ready.lock().unwrap() = true;
    }

    fn get_access_code(&self) -> Option<AccessCode> {
        let code = self.code_ready.lock().unwrap();
        if *code {
            return Some(AccessCode {
                code: self.code.lock().unwrap().clone().unwrap().code,
            });
        }
        None
    }

    /*   async fn handle_redirect(&self, code_option: Option<AccessCode>) -> ETVResult<Box<String>> {
        match code_option {
            Some(access_code) => {
                // Print out the code for debugging purposes.
                println!("{:#?}", access_code);

                // Set the access code and request an access token.
                // Callers should handle the Result from requesting an access token
                // in case of an error here.
                self.clone().set_and_req_access_code(access_code).await?;

                // Generic login page response.
                Ok(Box::new(
                    "Successfully Logged In! You can close your browser.".to_string(),
                ))
            }
            None => Err(Error::new(
                "No access code was returned from the authorization server.".to_string(),
            )),
        }
    } */

    fn oauth_client(self) -> OAuth {
        let mut oauth = OAuth::new();

        let redirect_uri_result = self.redirect_uri.lock().unwrap().clone();

        let redirect_uri = match redirect_uri_result {
            Some(uri) => f!("{}:{}", uri, self.port.lock().unwrap().unwrap()),
            None => f!("http://localhost:{}", self.port.lock().unwrap().unwrap()),
        };

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

    pub async fn start_auth_client(&self) -> &Self {
        let mut oauth = self.clone().oauth_client();
        let mut request = oauth.build_async().authorization_code_grant();
        request.browser_authorization().open().unwrap();
        self
    }
}

#[tauri::command]
#[specta::specta]
async fn start_auth<R: Runtime>(app: AppHandle<R>) {
    info!("[GraphAPIPlugin - start_auth]: Setting up redirect Listener");

    //plugin.handle_redirect(code_option);
    let app = app.clone();
    let app_handle = app.app_handle();
    app.listen_global("oauth://url", move |msg| {
        let url = msg.payload().unwrap().to_string();

        debug!("[GraphAPIPlugin - start_auth]: URL: {}", url);

        let code_option = Some(AccessCode {
            code: url.split("code=").collect::<Vec<&str>>()[1].to_string(),
        });

        debug!("[GraphAPIPlugin - start_auth]: Code: {:#?}", code_option);

        match code_option {
            Some(access_code) => {
                // Print out the code for debugging purposes.
                println!("{:#?}", access_code);
                // Generic login page response.
                app_handle
                    .emit_all("oauth://code", access_code.code)
                    .unwrap_or(error!("[GraphAPIPlugin - start_auth]: Failed to emit code to listeners"));
            }
            None => println!("[GraphAPIPlugin - start_auth]: No access code was returned from the authorization server."),
        }
    });

    //port = port_;
}

macro_rules! specta_builder {
    ($e:expr, Runtime) => {
        ts::builder()
            .commands(collect_commands![start_auth::<$e>])
            .path(generate_plugin_path(PLUGIN_NAME))
            .config(specta::ts::ExportConfig::default().formatter(specta::ts::prettier))
        //.events(collect_events![RandomNumber])
    };
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    //let plugin_utils = specta_builder!(R, Runtime).into_plugin_utils(PLUGIN_NAME);
    Builder::new(PLUGIN_NAME)
        //.invoke_handler(plugin_utils.invoke_handler)
        .setup(move |app| {
            let app = app.clone();

            let port = start(move |url| {
                debug!("[GraphAPIPlugin - Init]: Local auth server started");

                debug!("[GraphAPIPlugin - Init]: URL: {}", url);

                // Because of the unprotected localhost port, we must verify the URL here.
                // Preferebly send back only the token, or nothing at all if we can handle everything else in Rust.
                let _ = app.emit_all("redirect_uri", url);
            })
            .map_err(|err| err.to_string())
            .expect("Failed to start server");

            debug!(
                "[GraphAPIPlugin - Init]: Local auth server started on port {}",
                port
            );

            info!("[GraphAPIPlugin - Init]: Starting local auth listener");
            //(plugin_utils.setup)(&app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_auth])
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
