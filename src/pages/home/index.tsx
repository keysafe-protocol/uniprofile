import { useEthers } from "@usedapp/core";
import { useRequest } from "ahooks";
import Button from "components/button";
import { HomeMenus } from "constants/enum";
import { ROUTES } from "constants/routes";
import { ethers } from "ethers";
import useQueryParam from "hooks/use-query-param";
import useStores from "hooks/use-stores";
import { isEmpty } from "lodash-es";
import { observer } from "mobx-react-lite";
import React, { ReactComponentElement, ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accounts from "./accounts";
import Sidebar from "./sidebar";
import SocialLinks from "./social-links";
import Uniprofile from "./uni-profile";
import Web2Accounts from "./web2-accounts";

const Home = observer(() => {
  const {
    accountStore,
    accountStore: { web3UserInfo },
  } = useStores();
  const { account } = useEthers()
  useRequest(async () => {
    return accountStore.loadWeb3UserInfo(account!);
  }, { ready: !!account });
  const navigate = useNavigate();
  const [active = HomeMenus.KeyList] = useQueryParam<HomeMenus>("active");

  useEffect(() => {
    // if (!userInfo.email) {
    //   navigate(ROUTES.LOGIN_HOME);
    // } else if (isEmpty(accountChains)) {
    //   navigate(ROUTES.REGISTER);
    // }
    navigate("/?active=uni-profile");
  }, []);

  const COMPONENT_MAP: Partial<Record<HomeMenus, ReactNode>> = {
    // [HomeMenus.KeyList]: <Accounts />,
    // [HomeMenus.Web2Accounts]: <Web2Accounts />,
    [HomeMenus.UniProfile]: <Uniprofile />,
    [HomeMenus.SocialLinks]: <SocialLinks />,
  };

  return (
    <section className="flex justify-center ks-full-container bg-neutral-100">
      <main className="flex lg:max-w-6xl xl:max-w-7xl">
        <Sidebar />
        <div style={{ width: 800 }}>{COMPONENT_MAP[active]}</div>
      </main>
    </section>
  );
});
export default Home;
