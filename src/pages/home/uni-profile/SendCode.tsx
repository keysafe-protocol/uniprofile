import { useCountDown } from "ahooks";
import { Props } from "ahooks/lib/useControllableValue";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { formatCountDown } from "utils";
import accountServices from "stores/account/services";
const VerifyCode: FC<{
  email: string
} & Props> = ({ email }) => {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [countDown] = useCountDown({
    targetDate: endDate || 0,
  });

  const onResendClick = async () => {
    if (countDown > 0) return;
    await accountServices.authWeb3({ email })
    setEndDate(
      dayjs()
        .add(60, "s")
        .toDate()
    );
  };

  return (
    <div>
      <p className="text-sm text-justify">
        <span>
          We've sent a verification code to your email{" "}
          <strong>{email}</strong>. To continue with your login, please fill
          in with the verification code:
        </span>
      </p>
      <p className="my-1">
        <span
          className="cursor-pointer text-sm"
          style={{ color: !countDown ? "red" : "#9D9999" }}
          onClick={onResendClick}
        >
          {

            countDown ? <>Resend <span>({formatCountDown(countDown)})</span></> : <>Send verify code</>
          }
        </span>
      </p>
    </div>
  );
};
export default VerifyCode