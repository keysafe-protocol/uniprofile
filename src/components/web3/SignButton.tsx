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
  const { library } = useEthers()
  const onClick = async () => {
    const signer = await library?.getSigner()
    const signedMessage = await signer?.signMessage(lskey ? ls.get(lskey) : message)
    onSuccess(signedMessage!)
  }
  return <Button {...props} type="primary" onClick={onClick}>{text}</Button>
}
export default SignButton