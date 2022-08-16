import React, { FC, useState } from "react"
import Dialog from "rc-dialog";
import Button from "components/button";
import StepCode from "./SendCode";
import Input from "components/input";
import accountServices from "stores/account/services";


type Props = {
  email: string;
  onCancel: () => void;
  onOk: () => void;
};


const VerifyEmail: FC<Props> = ({ email, onCancel, onOk }) => {
  const [code, setCode] = useState('')

  // TODO: confirm email code
  const onContinueClick = async () => {
    await accountServices.dAuthConfirm({
      email,
      confirm_code: code,
    });
    onOk()
  };

  const onCodeChange = (value: string) => {
    setCode(value)
  }
  return <Dialog
    visible={true}
    onClose={onCancel}
    title="Email verification"
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