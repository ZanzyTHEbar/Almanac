#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg(target_os = "linux")]
use std::fs::metadata;
#[cfg(target_os = "linux")]
use std::path::PathBuf;
use std::time::Duration;

use log::error;
use serde::{Deserialize, Serialize};
use tokio::time::sleep;

//use sd_core::{Node, NodeError};

use tauri::{self, ipc::RemoteDomainAccessScope, Manager, RunEvent, WindowEvent};

//use tauri_plugin_store;

// use custom modules
mod modules;

//mod modules::tauri_plugins;

use modules::menu;

use modules::python_backend;

use modules::tauri_commands;

#[derive(Clone, Serialize)]
struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[derive(Clone, Serialize)]
struct SystemTrayPayload {
    message: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Config {
    names: Vec<String>,
    urls: Vec<String>,
}

/* enum TrayIcon {
  Filled,
  Unfilled,
}

enum TrayState {
  Visible,
  Hidden,
} */

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let mut backend = python_backend::Backend::default();
    let app = tauri::Builder::default();

    //Note: This is a workaround for a bug in tauri that causes the window to not resize properly inducing a noticeable lag
    // ! https://github.com/tauri-apps/tauri/issues/6322#issuecomment-1448141495
    let app = app.on_window_event(|e| {
        if let WindowEvent::Resized(_) = e.event() {
            std::thread::sleep(std::time::Duration::from_nanos(1));
        }
    });

    let app = app
        .invoke_handler(tauri::generate_handler![
            //tauri_commands::close_splashscreen,
            tauri_commands::get_user,
            tauri_commands::handle_save_window_state,
            tauri_commands::handle_load_window_state,
        ])
        // allow only one instance and propagate args and cwd to existing instance
        .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
            app.emit_all("new-instance", Some(SingleInstancePayload { args, cwd }))
                .unwrap_or_else(|e| {
                    eprintln!("Failed to emit new-instance event: {}", e);
                });
        }))
        // persistent storage with file system
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_upload::init())
        // splashscreen support
        .plugin(tauri_plugin_splashscreen::init())
        // save window position and size between sessions
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(move |app| {
            //let window = app
            //  .get_window("main")
            //  .unwrap_or_else(|| panic!("Failed to get window {}", "main"));
            //set_shadow(&window, true).expect("Unsupported platform!");
            //window.hide().unwrap();

            //#[cfg(feature = "updater")]
            //tauri::updater::builder(app.handle()).should_install(|_current, _latest| true);

            app.trigger_global("set-backend-ready", None);

            let app_handle = app.handle();

            app.windows().iter().for_each(|(_, window)| {
        tokio::spawn({
          let window = window.clone();

          async move {
            sleep(Duration::from_secs(3)).await;
            if !window.is_visible().unwrap_or(true) {
              error!("[]:  Window did not emit `app_ready` event in time, showing it now.");

              window.show().expect("Main window failed to show");
            }
          }
        });

        window.set_decorations(false).unwrap();
      });

            // Configure IPC for custom protocol
            app.ipc_scope().configure_remote_access(
                RemoteDomainAccessScope::new("localhost")
                    .allow_on_scheme("eyetrackvr")
                    .add_window("main"),
            );

            // log to file, stdout and webview console support
            app_handle
                .plugin(
                    tauri_plugin_log::Builder::default()
                        .targets([
                            tauri_plugin_log::LogTarget::LogDir,
                            tauri_plugin_log::LogTarget::Stdout,
                            tauri_plugin_log::LogTarget::Webview,
                        ])
                        .filter(|metadata| metadata.target() != "polling::iocp")
                        .level(tauri_commands::handle_debug(app_handle.clone()).unwrap())
                        .build(),
                )
                .expect("Failed to initialize logger");

            Ok(())
        })
        .system_tray(menu::create_system_tray())
        .on_system_tray_event(menu::handle_menu_event)
        .build(tauri::generate_context!())?;

    app.run(move |_app, event| match event {
        RunEvent::Ready => {
            /* let window = app
            .get_window("main")
            .expect("[App Boot]: Failed to get window");

            let child = python_backend::start_backend().expect("Failed to start backend.");

            //let output = child.wait_with_output().expect("Failed to read stdout");
            //io::stdout().write_all(&output.stdout).unwrap();

            _ = backend.0.insert(child); */
        }
        RunEvent::ExitRequested { .. } => {
            /* if let Some(child) = backend.0.take() {
                python_backend::stop_backend(child)
                    .expect("[App Exit]: Failed to shutdown backend.");
            } */
        }
        _ => {}
    });

    Ok(())
}
