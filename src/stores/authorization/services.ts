import { EStatus } from "constants/enum";
import request from "utils/request";
interface DAuthOPermitData {
  did: number;
  handler: EStatus;
}
const dAuthServices = {
  dAuthPermit(data: any) {
    return request.post(`/dauth_permit`, data);
  },

  getDAuthInfo(account: string) {
    return request.post(`/dauth_info`, { account });
  },
};

export default dAuthServices;
