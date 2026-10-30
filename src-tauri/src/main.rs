#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_shell::init())
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      #[cfg(debug_assertions)]
      {
        window.open_devtools();
      }
      Ok(())
    })
    .run(tauri::generate_context!());
}
