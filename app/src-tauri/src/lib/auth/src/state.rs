use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct AccessTokenInfo {
    pub code: String,
}

#[derive(Debug, Clone)]
pub struct User {
    pub name: String,
    pub email: String,
}

pub struct ClientIDState {}

pub struct OauthState {}

impl OauthState {
    pub fn reset(&self) {}
}