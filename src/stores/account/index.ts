import { data } from "autoprefixer";
import {
  LOCAL_STORAGE_KEY_ACCOUNT,
  LOCAL_STORAGE_TOKEN,
} from "constants/index";
import { makeAutoObservable } from "mobx";
import ls from "utils/ls";
import services from "./services";
import { AccountChain, UserInfo, Web3UserInfo } from "./types";

export default class AccountStore {
  accountChains: AccountChain[] = [];
  userInfo: UserInfo = {};
  web3UserInfo: Web3UserInfo = {};

  constructor() {
    makeAutoObservable(this);
  }

  async loadUserInfo() {
    const res = await services.getUserInfo();
    this.accountChains = res.data || [];
    const email = ls.get(LOCAL_STORAGE_KEY_ACCOUNT);
    this.userInfo = {
      email: email,
    };
  }
  async loadWeb3UserInfo(account: string) {
    const res = await services.getWeb3Userinfo(account);
    if(res.status === 'success' ) {
      this.web3UserInfo = {
        email: res.user.email,
        account,
        username: res.user.uname
      }  
    }
    ;
  }
  async resetWeb3UserInfo ( ){
    this.web3UserInfo = {
      email: '',
      account: '',
      username: ''
    } 
  }

  updateUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  logout() {
    ls.set(LOCAL_STORAGE_KEY_ACCOUNT, null);
    ls.set(LOCAL_STORAGE_TOKEN, null);
  }
}
