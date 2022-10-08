export enum ChainType {
  Eth = "ethereum",
  Boba = "boba",
  Astar = "Astar",
  // Btc = "btc",
}

export enum ConditionType {
  Email = "email",
  Passphrase = "password",
  GAuth = "gauth",
  OAuthGithub = "oauth@github",
}

export enum HomeMenus {
  KeyList = "key-list",
  Web2Accounts = "web2-accounts",
  AuthConditions = "auth-conditions",
  GeneralSettings = "general-settings",
  UniProfile = "uni-profile",
  SocialLinks = "social-links",
  Authorizations = "authorizations",
  Logout = "logout",
}

export enum PostMesaageType {
  OAuthSuccess, // oauth 成功
  OAuthFail, // oauth 失败
}

export enum OAuthType {
  Github = "oauth@github",
  Google = "oauth@google",
  Twitter = "oauth@twitter",
}

export enum OAuthOrg {
  Github = "github",
  Google = "google",
  Twitter = "twitter",
}
export enum EStatus {
  CANCELED = -2,
  DENIED,
  PENDING,
  APPROVED,
}
