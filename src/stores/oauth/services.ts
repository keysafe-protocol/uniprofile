import request from "utils/request";
import { OAuthInfo, OAuthRequest } from "./types";
type TOAuthType = "github" | "google" | "twitter"
const oauthServices = {
  oauth(data: OAuthRequest): Promise<{ profile: string }> {
    return request.post(`/oauth`, data);
  },

  getOAuthInfo() {
    return request.post(`/oauth_info`);
  },
  getOAuthInfoByWeb3Account(account: string) {
    return request.post(`/oauth_info`, {account});
  },
  registerOauthByWeb3 (type: TOAuthType, data: any) {
    return request.post(`/register_${type}_oauth`,data)
  }
};

export default oauthServices;
