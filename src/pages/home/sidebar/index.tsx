import React, { useEffect } from "react";
import avatarImg from "assets/imgs/avatar.svg";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import classNames from "classnames";
import useQueryParam from "hooks/use-query-param";
import { HomeMenus } from "constants/enum";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { useEthers } from "@usedapp/core";

const Sidebar = observer(() => {
  const {
    accountStore,
    accountStore: { web3UserInfo },
    oauthStore,
  } = useStores();
  const { account } = useEthers()
  const [active = HomeMenus.KeyList, setActive] = useQueryParam("active");
  const navigate = useNavigate();
  useEffect(() => {
    if (account) {
      accountStore.loadWeb3UserInfo(account)
      oauthStore.loadOAuthInfoByWeb3Account(account)
    } else {
      accountStore.resetWeb3UserInfo()
      oauthStore.resetOAuthInfoByWeb3Account()
    }
  }, [account])
  const menuClass = (menu: HomeMenus) =>
    classNames("cursor-pointer", {
      "text-basecolor font-bold": menu === active,
    });
  const onMenuClick = (menu: HomeMenus) => {
    setActive(menu);
  };

  return (
    <div className="w-96 ks-full-container bg-white px-16 py-8">
      <div className="flex flex-col items-center">
        <img src={avatarImg} className="w-full" />
        <span className="mt-2 text-xl">{web3UserInfo.username}</span>
        <span className="mt-2 text-xl">{web3UserInfo.email}</span>
        {/* <span className="mt-2 text-base" style={{ color: "#999999" }}>
          USER ID: TODO
        </span> */}
      </div>
      <div className="mt-16">
        <ul className="text-2xl " style={{ lineHeight: "60px" }}>
          <li
            className={menuClass(HomeMenus.UniProfile)}
            onClick={() => onMenuClick(HomeMenus.UniProfile)}
          >
            My UniProfile
          </li>
          <li
            className={menuClass(HomeMenus.SocialLinks)}
            onClick={() => onMenuClick(HomeMenus.SocialLinks)}
          >
            My Social Links
          </li>
        </ul>
      </div>
    </div>
  );
});
export default Sidebar;

