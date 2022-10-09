import { EStatus } from "constants/enum";
import { makeAutoObservable } from "mobx";
import dauthServices from "./services";
import { IDauthRequest } from "./types";
import { shortenIfAddress } from "@usedapp/core"

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
    const data = res.dauth.map((item: any) => {
      item.dapp_addr = shortenIfAddress(item.dapp_addr)
      return item
    })
    this.pendingRequests = data.filter((item: any) => item.da_status === EStatus.PENDING)
    this.requestHistory = data.filter((item: any) => item.da_status !== EStatus.PENDING)
  }
  async resetRequestAuthList() {
    this.requestHistory = [];
  }
}
