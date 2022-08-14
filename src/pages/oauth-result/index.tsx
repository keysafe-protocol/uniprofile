import React, { useEffect, useMemo, useRef, useState } from "react";
import queryString from "query-string";
import { isString } from "lodash-es";
import oauthServices from "stores/oauth/services";
import { useCountDown, useLocalStorageState, useRequest } from "ahooks";
import { OAuthOrg, PostMesaageType } from "constants/enum";
import dayjs from "dayjs";
import { formatCountDown } from "utils";
import services from "stores/oauth/services";
import useStores from "hooks/use-stores";
import { useEthers } from "@usedapp/core";

const OAuthResult = (props: any) => {
  const postedRef = useRef(false);
  const { library, account } = useEthers()
  const [targetDate, setTargetDate] = useState<Date>();
  const [countDown] = useCountDown({
    targetDate,
    onEnd: () => {
      window.close();
    },
  });

  const search = window.location.search;

  const code = useMemo(() => {
    if (isString(search)) {
      return queryString.parse(search).code;
    }
    return undefined;
  }, [search]);

  const { loading, error } = useRequest(async () => {
    if (code && window.opener && !postedRef.current) {
      postedRef.current = true;
      window.opener.postMessage(
        {
          type: PostMesaageType.OAuthSuccess,
          data: code,
        },
        window.opener.location
      );
      setTargetDate(
        dayjs()
          .add(3, "s")
          .toDate()
      );

    } else {
      return Error();
    }
  }, {
    ready: !!account
  });

  return (
    <section>
      <div className="flex justify-center pt-20">
        {error || !code ? (
          <div className="text-center text-red-500 text-lg">
            Authorization is failed, please try again later
          </div>
        ) : (
          <div className="text-center text-basecolor text-lg">
            Authorization is successful, this page will close in{" "}
            <strong>{formatCountDown(countDown)}</strong> seconds.
          </div>
        )}
      </div>
    </section>
  );
};
export default OAuthResult;
