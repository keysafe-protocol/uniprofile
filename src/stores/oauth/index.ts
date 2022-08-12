import { makeAutoObservable } from "mobx";
import oauthServices from "./services";
import { OAuthInfo } from "./types";

export default class OAuthStore {
  oauthConnencted: OAuthInfo[] = [];
  oauthConnenctedByWeb3: OAuthInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadOAuthInfo() {
    const res = await oauthServices.getOAuthInfo();
    this.oauthConnencted = res.data || [];
  }
  async loadOAuthInfoByWeb3Account(account: string) {
    const res: any = await oauthServices.getOAuthInfoByWeb3Account(account);
    this.oauthConnenctedByWeb3 = res.oauth || [];
  }
  async resetOAuthInfoByWeb3Account() {
    this.oauthConnenctedByWeb3 = []
  }
}
