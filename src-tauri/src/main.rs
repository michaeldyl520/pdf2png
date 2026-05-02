use std::env;
use std::fs::File;
use std::io::Write;
use tauri::command;

#[command]
fn save_png(path: String, data: Vec<u8>) -> Result<(), String> {
    let mut file = File::create(&path).map_err(|e| e.to_string())?;
    file.write_all(&data).map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![save_png])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}