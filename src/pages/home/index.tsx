import { useEthers } from "@usedapp/core";
import { useRequest } from "ahooks";
import { HomeMenus } from "constants/enum";
import useQueryParam from "hooks/use-query-param";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import React, { ReactComponentElement, ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Sidebar from "./sidebar";
import SocialLinks from "./social-links";
import Uniprofile from "./uni-profile";
import Authorizations from "./authorizations";

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
    navigate("/?active=uni-profile");
  }, []);

  const COMPONENT_MAP: Partial<Record<HomeMenus, ReactNode>> = {
    [HomeMenus.UniProfile]: <Uniprofile />,
    [HomeMenus.SocialLinks]: <SocialLinks />,
    [HomeMenus.Authorizations]: <Authorizations />,
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
