import { EStatus } from "constants/enum";
import { makeAutoObservable } from "mobx";
import dauthServices from "./services";
import { IDauthRequest } from "./types";

export default class DAuthStore {
  requestHistory: IDauthRequest[] = [];
  pendingRequests: IDauthRequest[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async loadRequestAuthList(account:string) {
    const res: any = await dauthServices.getDAuthInfo(account);
    this.requestHistory = []
    this.requestHistory = res.dauth || [];
    this.pendingRequests = res.dauth.filter((item: any) => item.da_status === EStatus.PENDING)
    this.requestHistory = res.dauth.filter((item: any) => item.da_status !== EStatus.PENDING)
  }
  async resetRequestAuthList() {
    this.requestHistory = [];
  }
}
