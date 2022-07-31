import React, { FC, useEffect, useState } from "react"
import Dialog from "rc-dialog";
import Button from "components/button";
import StepCode from "./SendCode";
import Input from "components/input";
import accountServices from "stores/account/services";
import { encrypt2 } from "utils/secure";


type Props = {
  email: string;
  onCancel: () => void;
  onOk: () => void;
};


const VerifyEmail: FC<Props> = ({ email, onCancel, onOk }) => {
  const [code, setCode] = useState('')


  const onContinueClick = async () => {
    await accountServices.authConfirm({
      account: email,
      mail: email,
      cipher_code: encrypt2(code),
    });
    onOk()
  };

  const onCodeChange = (value: string) => {
    setCode(value)
  }
  return <Dialog
    visible={true}
    onClose={onCancel}
    title="AUTH #1"
    footer={
      <footer className="  text-center">
        <Button onClick={onCancel} className={'mr-10'}>CANCEL</Button>
        <Button onClick={onContinueClick} type="primary"
        >CONFIRM</Button>
      </footer>
    }
  > <>
      <StepCode email={email} />
      <Input value={code} onChange={(e) => onCodeChange(e.target.value)} />
    </></Dialog>
}
export default VerifyEmail