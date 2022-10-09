import { EStatus } from "constants/enum";

export interface IDauthRequest {
  kid: number;
  dapp: string;
  dapp_pub_addr: string;
  scope: string;
  apple_time: string;
  da_status: EStatus;
}
