import { useEthers } from "@usedapp/core"
import Button from "components/button"
import React, { FC } from "react"
import ls from "utils/ls"
import notify from "../../utils/message";


type Props = {
  text: string,
  message?: string
  lskey?: string
  onSuccess: (signedMessage: string) => void
}
const SignButton: FC<Props & Partial<React.ComponentProps<typeof Button>>> = ({ text, message, onSuccess, lskey, ...props }) => {
  const { library, account, activateBrowserWallet } = useEthers()
  const onClick = async () => {
    if (!account) {
      return notify({
        content: "Please connect your wallet"
      });
    }


    const signer = await library?.getSigner()
    const signedMessage = await signer?.signMessage(message!)
    onSuccess(signedMessage!)

  }
  return <Button {...props} type="primary" onClick={onClick}>{text}</Button>
}
export default SignButton