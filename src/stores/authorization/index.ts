import { makeAutoObservable } from "mobx";
import dauthServices from "./services";
import { IDauthRequest } from "./types";

export default class DAuthStore {
  requestHistory: IDauthRequest[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async loadRequestAuthList(account: string) {
    const res = await dauthServices.getDAuthInfo(account);
    this.requestHistory = res.data || [];
  }
  async resetRequestAuthList() {
    this.requestHistory = [];
  }
}
