#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use kimai_tauri::{login, settings, ApplicationState, ApplicationStateInner};
use tauri::{async_runtime::Mutex, CustomMenuItem, SystemTray, SystemTrayMenu};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new().add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    let settings_dir = directories::BaseDirs::new()
        .expect("Could not get HOME directory")
        .config_dir()
        .join("kimai-tauri-settings.toml");
    let state = ApplicationState(Mutex::new(ApplicationStateInner {
        settings: settings::load_settings().ok(),
        settings_dir,
    }));

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            login::login,
            login::get_api_key,
            login::logout
        ])
        .system_tray(tray)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
