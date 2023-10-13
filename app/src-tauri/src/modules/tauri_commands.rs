use log::debug;
use log::{error, info};
use tauri::{self, Manager, Window};

use tauri_plugin_store::with_store;

//use specta::collect_types;
//use tauri_specta::ts;
use tauri_plugin_window_state::{AppHandleExt, StateFlags, WindowExt};
use whoami::username;

/// A command to get the user name from the system
/// ## Returns
/// - `user_name`: String - The user name of the current user
#[tauri::command]
#[specta::specta]
pub async fn get_user() -> Result<String, String> {
    let user_name: String = username();
    info!("User name: {}", user_name);
    Ok(user_name)
}

/// TODO: implement a way to open the logs dir from the UI
//#[tauri::command(async)]
//#[specta::specta]
//async fn open_logs_dir(node: tauri::State<'_, Arc<Node>>) -> Result<(), ()> {
//	let logs_path = node.data_dir.join("logs");
//
//	#[cfg(target_os = "linux")]
//	let open_result = sd_desktop_linux::open_file_path(&logs_path);
//
//	#[cfg(not(target_os = "linux"))]
//	let open_result = opener::open(logs_path);
//
//	open_result.map_err(|err| {
//		error!("Failed to open logs dir: {err}");
//	})
//}

#[tauri::command]
#[specta::specta]
pub async fn handle_save_window_state<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
) -> Result<(), String> {
    app.save_window_state(StateFlags::all())
        .expect("[Window State]: Failed to save window state");

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn handle_load_window_state<R: tauri::Runtime>(
    window: tauri::Window<R>,
) -> Result<(), String> {
    window
        .restore_state(StateFlags::all())
        .expect("[Window State]: Failed to restore window state");

    Ok(())
}

pub fn handle_debug<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
) -> Result<log::LevelFilter, String> {
    // read the Store file
    let stores = app.state::<tauri_plugin_store::StoreCollection<R>>();
    let path = std::path::PathBuf::from(".app-settings.bin");
    // match the store value to a LogFilter
    let mut debug_state: String = String::new();
    with_store(app.clone(), stores, path, |store| {
        let settings = store.get("settings");
        debug!("Settings: {:?}", settings);
        if let Some(json) = settings {
            let _serde_json = serde_json::from_value::<serde_json::Value>(json.clone());
            debug!("Serde JSON: {:?}", _serde_json);
            let serde_json_result = match _serde_json {
                Ok(serde_json) => serde_json,
                Err(err) => {
                    error!("Error configuring JSON config file: {}", err);
                    return Err(tauri_plugin_store::Error::Json(err));
                }
            };
            let temp = &serde_json_result["debugMode"];
            debug!("Debug: {:?}", temp);
            debug_state = serde_json::from_value::<String>(temp.clone()).unwrap();
        } else {
            debug_state = serde_json::json!({}).to_string();
        }
        info!("Debug state: {}", debug_state);
        Ok(())
    })
    .expect("Failed to get store");
    // set the log level
    let log_level = match debug_state.as_str() {
        "off" => log::LevelFilter::Off,
        "error" => log::LevelFilter::Error,
        "warn" => log::LevelFilter::Warn,
        "info" => log::LevelFilter::Info,
        "debug" => log::LevelFilter::Debug,
        "trace" => log::LevelFilter::Trace,
        _ => log::LevelFilter::Debug,
    };
    // return the result
    Ok(log_level)
}
