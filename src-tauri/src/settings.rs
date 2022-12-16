use serde::{Deserialize, Serialize};
use std::{fs, io};

#[derive(Deserialize, Serialize, Clone)]
pub struct Settings {
    pub kimai_user: Option<String>,
    pub api_url: Option<String>,
}

pub fn load_settings() -> Result<Settings, io::Error> {
    let file = fs::read("./settings.toml")?;
    let toml_file = toml::from_slice::<toml::Value>(&file)?;

    Ok(Settings {
        kimai_user: toml_file
            .get("kimai_user")
            .map(|user| user.as_str().unwrap().to_string()),
        api_url: toml_file
            .get("api_url")
            .map(|url| url.as_str().unwrap().to_string()),
    })
}
