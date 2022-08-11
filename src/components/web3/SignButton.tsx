import { useEthers } from "@usedapp/core"
import Button from "components/button"
import React, { FC } from "react"


type Props = {
  text: string,
  message: string
  onSuccess: (signedMessage: string) => void
}
const SignButton: FC<Props & Partial<React.ComponentProps<typeof Button>>> = ({ text, message, onSuccess, ...props }) => {
  const { library } = useEthers()
  const onClick = async () => {
    const signer = await library?.getSigner()
    const signedMessage = await signer?.signMessage(message)
    onSuccess(signedMessage!)
    console.log(signedMessage)
  }
  return <Button {...props} type="primary" onClick={onClick}>{text}</Button>
}
export default SignButton