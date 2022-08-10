import request from "utils/request";
import { AuthConfirmRequest, DAuthConfirmRequest } from "./types";

type TSignMessage = {
  sig: string,
  data: any
}
export default {
  // Send code to email
  auth(data: { account: string }) {
    return request.post(`/auth`, {
      ...data,
      key: "",
    });
  },
  authWeb3(data: { email: string }) {
    return request.post(`/auth`, data);
  },

  // Bind account with email code
  authConfirm(data: AuthConfirmRequest): Promise<{ token: string }> {
    return request.post(`/auth_confirm`, data);
  },
  dAuthConfirm(data: DAuthConfirmRequest) {
    return request.post(`/auth_confirm`, data);
  },

  getUserInfo() {
    return request.post("/info");
  },
  getWeb3Userinfo (account: string): Promise<{
    status: string,
    user: {
      kid: string,
      uname: string,
      email: string
    }
  }> {
    return request.post('/user_info', {account})
  },
  registerWeb3User (data: TSignMessage) {
    return request.post('/register_user', data)
  }
};
