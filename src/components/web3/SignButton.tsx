import { useEthers } from "@usedapp/core"
import Button from "components/button"
import React, { FC } from "react"
import ls from "utils/ls"


type Props = {
  text: string,
  message?: string
  lskey?: string
  onSuccess: (signedMessage: string) => void
}
const SignButton: FC<Props & Partial<React.ComponentProps<typeof Button>>> = ({ text, message, onSuccess, lskey, ...props }) => {
  const { library, account, activateBrowserWallet } = useEthers()
  const onClick = async () => {
    const msg = lskey ? ls.get(lskey) : message;

    if (msg) {
      const signer = await library?.getSigner()
      const signedMessage = await signer?.signMessage(lskey ? ls.get(lskey) : message)
      onSuccess(signedMessage!)
    }
  }
  if (!account) {
    return <Button {...props} type="primary" onClick={() => {
      activateBrowserWallet()
    }}>Connect to wallet</Button>
  }
  return <Button {...props} type="primary" onClick={onClick}>{text}</Button>
}
export default SignButton