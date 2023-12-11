//use reqwest::Client;

use std::sync::{atomic::Ordering, Arc, Mutex};
use std::time::Duration;

use tauri::{
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime,
};

use tiny_http::{Header, Method, Request, Response, Server, StatusCode};
use url::form_urlencoded::Parse;

use utils::prelude::*;

pub mod state;
use crate::state::{AccessTokenInfo, ClientIDState, OauthState, User};

const PLUGIN_NAME: &str = "tauri-plugin-auth-api";

#[derive(Debug)]
pub struct AuthAPIPlugin {
    pub user: Option<User>,
    pub redirect_uri: Arc<Mutex<Option<String>>>,
    pub port: Arc<Mutex<Option<u16>>>,
    pub code_ready: Arc<Mutex<bool>>,
    code: Arc<Mutex<Option<AccessTokenInfo>>>,
}

impl Clone for AuthAPIPlugin {
    fn clone(&self) -> AuthAPIPlugin {
        AuthAPIPlugin {
            user: self.user.clone(),
            redirect_uri: self.redirect_uri.clone(),
            port: self.port.clone(),
            code_ready: self.code_ready.clone(),
            code: self.code.clone(),
        }
    }
}

impl AuthAPIPlugin {
    fn new() -> Self {
        Self {
            user: None,
            redirect_uri: Arc::new(Mutex::new(Some("http://localhost".to_string()))),
            port: Arc::new(Mutex::new(None)),
            code_ready: Arc::new(Mutex::new(false)),
            code: Arc::new(Mutex::new(None)),
        }
    }

    fn start_login(self, app_handle: AppHandle) {
        // Reset the OAuth state
        app_handle.state::<OauthState>().reset();

        info!("[AuthAPIPlugin - start_login]: Starting login");
        info!("[AuthAPIPlugin - start_login]: Starting OAuth server");

        let address = std::net::Ipv4Addr::new(127, 0, 0, 1);

        let port = 23634;

        match tiny_http::Server::http((address, port)) {
            Ok(server) => {
                let server_app_handle = app_handle.clone();
                std::thread::spawn(move || {
                    //run(server, server_app_handle);
                });

                AuthAPIPlugin::open_login_window(&self, &app_handle, port);
                return;
            }
            Err(error) => {}
        }
    }

    fn open_login_window(&self, app_handle: &AppHandle, port: u16) {}

    fn is_ready(&self) -> bool {
        return *self.code_ready.lock().unwrap();
    }

    fn set_code_ready(&self) {
        *self.code_ready.lock().unwrap() = true;
    }

    fn get_access_code(&self) -> Option<AccessTokenInfo> {
        let code = self.code_ready.lock().unwrap();
        if *code {
            return Some(AccessTokenInfo {
                code: self.code.lock().unwrap().clone().unwrap().code,
            });
        }
        None
    }
}

#[tauri::command]
#[specta::specta]
async fn start_auth<R: Runtime>(app: AppHandle<R>) {
    info!("[AuthAPIPlugin - start_auth]: Setting up redirect Listener");

    let app = app.clone();
    let app_handle = app.app_handle();
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

            info!("[AuthAPIPlugin - Init]: Starting local auth listener");
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
