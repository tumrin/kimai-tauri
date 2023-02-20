use crate::{settings::Settings, ApplicationState, CRATE_NAME};
use std::fs;

#[tauri::command]
pub async fn login(
    kimai_username: String,
    api_key: String,
    api_url: String,
    state: tauri::State<'_, ApplicationState>,
) -> Result<(), tauri::InvokeError> {
    let settings = Settings {
        kimai_user: Some(kimai_username),
        api_url: Some(api_url),
    };

    let mut app_state = state.0.lock().await;

    let toml =
        toml::to_string(&settings).map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    // Save settings
    fs::write(&app_state.settings_dir, toml)
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    let password_entry = keyring::Entry::new(CRATE_NAME, settings.kimai_user.as_ref().unwrap()) // Safe to unwrap since we just made this
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;
    password_entry
        .set_password(&api_key)
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    app_state.settings = Some(settings);

    Ok(())
}

#[tauri::command]
pub async fn logout(state: tauri::State<'_, ApplicationState>) -> Result<(), tauri::InvokeError> {
    let mut app_state = state.0.lock().await;
    let settings = app_state
        .settings
        .as_ref()
        .ok_or(tauri::InvokeError::from("Could not find settings"))?;

    // Remove settings
    fs::remove_file(&app_state.settings_dir)
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    let password_entry = keyring::Entry::new(CRATE_NAME, &settings.kimai_user.clone().unwrap())
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;
    password_entry
        .delete_password()
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;
    app_state.clear();

    Ok(())
}

#[tauri::command]
pub async fn get_api_key(
    state: tauri::State<'_, ApplicationState>,
) -> Result<(String, String, String), tauri::InvokeError> {
    let app_state = state.0.lock().await;
    let settings = app_state
        .settings
        .clone()
        .ok_or_else(|| tauri::InvokeError::from("No settings"))?;

    let kimai_user = settings
        .kimai_user
        .ok_or_else(|| tauri::InvokeError::from("No kimai user in settings"))?;

    let api_url = settings
        .api_url
        .ok_or_else(|| tauri::InvokeError::from("No API url in settings"))?;
    let password_entry = keyring::Entry::new(CRATE_NAME, &kimai_user)
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;
    let api_key = password_entry
        .get_password()
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    Ok((kimai_user, api_key, api_url))
}
