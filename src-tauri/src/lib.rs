pub mod login;
pub mod settings;

use settings::Settings;
use tauri::async_runtime::Mutex;

pub const CRATE_NAME: &str = env!("CARGO_PKG_NAME");

pub struct ApplicationStateInner {
    pub settings: Option<Settings>,
}
impl ApplicationStateInner {
    pub fn clear(&mut self) {
        self.settings = None
    }
}
pub struct ApplicationState(pub Mutex<ApplicationStateInner>);
