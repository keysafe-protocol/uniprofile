import { ChainType } from "./enum";

export const LOCAL_STORAGE_KEY_ACCOUNT = "keysafe_account";
export const LOCAL_STORAGE_TOKEN = "keysafe_token";
export const CHAIN_TYPE_MAP = {
  [ChainType.Eth]: "Ethereum",
  [ChainType.Boba]: "Boba Rinkeby",
  [ChainType.Astar]: "Astar",
};
