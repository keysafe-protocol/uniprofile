import { GITHUB_CLIENT_ID } from "constants/index";
import React from "react";
import oauth from "utils/oauth";
import queryString from "query-string";
import { ROUTES } from "constants/routes";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import { useRequest } from "ahooks";
import { OAuthOrg } from "constants/enum";
import OAuthCard from "./oauth-card";
import { find, findIndex } from "lodash-es";
import Loading from "components/loading";
import SignButton from "components/web3/SignButton";
import { useEthers } from "@usedapp/core";
import services from "stores/oauth/services";
import Web3Identicials from "./web3Identicials";
import oauthServices from "stores/oauth/services";

const SocialLinks = observer(() => {
  const {
    oauthStore,
    oauthStore: { oauthConnenctedByWeb3 },
  } = useStores();
  const { account } = useEthers();
  const { loading } = useRequest(async () => {
    return await oauthStore.loadOAuthInfoByWeb3Account(account!);
  }, {
    ready: !!account
  });
  const onSave = async (signedMessage: string) => {
    await services.registerOauthByWeb3('github', { data: "fake oauth code", sig: signedMessage })
    oauthStore.loadOAuthInfoByWeb3Account(account!)
  }
  if (loading) return <Loading />;
  return (
    <div className="ml-4 pt-8">
      <h3 className="text-2xl text-basecolor font-bold">My Web2 Accounts</h3>
      <div className="flex mt-8">
        {Object.values(OAuthOrg).map((type) => (
          <OAuthCard
            key={type}
            type={type}
            oauthInfo={find(oauthConnenctedByWeb3, { org: type })}
          />
        ))}
      </div>
      <SignButton
        className="mt-10"
        text="SAVE"
        message={"fake oauth code"}
        onSuccess={onSave}>
      </SignButton>
      <Web3Identicials />
    </div>

  );
});
export default SocialLinks;
