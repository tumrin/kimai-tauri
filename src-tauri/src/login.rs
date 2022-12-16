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

    let toml =
        toml::to_string(&settings).map_err(|err| tauri::InvokeError::from(err.to_string()))?;
    fs::write("./settings.toml", toml).map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    let password_entry = keyring::Entry::new(CRATE_NAME, settings.kimai_user.as_ref().unwrap()); // Safe to unwrap since we just made this
    password_entry
        .set_password(&api_key)
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    let mut app_state = state.0.lock().await;
    app_state.settings = Some(settings);

    Ok(())
}
// TODO: Add error handling to logout function
#[tauri::command]
pub async fn logout(state: tauri::State<'_, ApplicationState>) -> Result<(), tauri::InvokeError> {
    let mut app_state = state.0.lock().await;
    let settings = app_state.settings.as_ref().unwrap();
    fs::remove_file("./settings.toml").unwrap();
    let password_entry = keyring::Entry::new(CRATE_NAME, &settings.kimai_user.clone().unwrap());
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
    let password_entry = keyring::Entry::new(CRATE_NAME, &kimai_user);
    let api_key = password_entry
        .get_password()
        .map_err(|err| tauri::InvokeError::from(err.to_string()))?;

    Ok((kimai_user, api_key, api_url))
}
