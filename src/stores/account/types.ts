import { ChainType } from "constants/enum";

export type AuthConfirmRequest = {
  account: string;
  mail: string;
  cipher_code: string;
};
export type DAuthConfirmRequest = {
  email: string;
  confirm_code: string;
};

export type AccountChain = {
  chain: ChainType;
  chain_addr: string;
  owner: string;
};

export type UserInfo = {
  email?: string;
  key?: string;
};

export type Web3UserInfo = {
  account?: string,
  username?: string,
  email?: string
};