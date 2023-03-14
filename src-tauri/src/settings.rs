use serde::{Deserialize, Serialize};
use std::{fs, io, path::PathBuf};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Settings {
    pub kimai_user: Option<String>,
    pub api_url: Option<String>,
}

pub fn load_settings(settings_dir: &PathBuf) -> Result<Settings, io::Error> {
    let file = fs::read_to_string(settings_dir)?;
    let toml_file = toml::from_str::<toml::Value>(&file)
        .map_err(|err| io::Error::new(io::ErrorKind::Other, err))?;

    Ok(Settings {
        kimai_user: toml_file
            .get("kimai_user")
            .map(|user| user.as_str().unwrap().to_string()),
        api_url: toml_file
            .get("api_url")
            .map(|url| url.as_str().unwrap().to_string()),
    })
}
