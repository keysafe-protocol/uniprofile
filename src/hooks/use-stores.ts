import { createContext, useContext } from "react";
import AccountStore from "stores/account";
import OAuthStore from "stores/oauth";
import RegisterStore from "stores/register";
import RequestHistoryStore from "stores/authorization";

const RootStoreContext = createContext({
  registerStore: new RegisterStore(),
  accountStore: new AccountStore(),
  oauthStore: new OAuthStore(),
  requestHistoryStore: new RequestHistoryStore(),
});

const useStores = () => useContext(RootStoreContext);
export default useStores;
