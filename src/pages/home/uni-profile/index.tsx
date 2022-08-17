import Button from 'components/button';
import Input from 'components/input';
import VerifyEmail from './VerifyEmail';
import React, { useState } from 'react';
import { checkEmail } from 'utils';
import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import SignButton from 'components/web3/SignButton';
import services from 'stores/account/services';
import useStores from 'hooks/use-stores';
import message from 'utils/message';
const Uniprofile = () => {
  const { library, account } = useEthers()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)
  const [verified, setVerified] = useState(false)
  const {
    accountStore,
    accountStore: { web3UserInfo },
  } = useStores();
  const onUsernameChange = (value: string) => {
    setUsername(value)
  }
  const onEmailChange = (value: string) => {
    setEmail(value)
  }
  const onSave = async () => {
    // let recovered = ethers.utils.verifyMessage(JSON.stringify({
    //   username,
    //   email
    // }), signedMessage!)
    // console.log("recovered", signedMessage)
    // TODO: 调用后端接口, 传入签名前后的数据, 后端可以拿到钱包地址

  }
  const onSignSuccess = async (signedMessage: string) => {
    await services.registerWeb3User({
      sig: signedMessage,
      data: { uname: username, email }
    })
    accountStore.loadWeb3UserInfo(account!)
  }
  const onVerify = () => {
    if (!account) {
      return message({
        content: "Please connect your wallet"
      })
    }
    email && checkEmail(email) && setVisible(true);
  }
  return <section className="flex justify-center items-center ks-full-container">

    {/* 登录框 */}
    <div
      className=" w-7/12"
    >
      {visible && (
        <VerifyEmail
          email={email}
          onOk={() => { setVisible(false); setVerified(true) }}
          onCancel={() => setVisible(false)}
        />
      )}
      <div className=''>
        <div>
          <div>Username</div>
          <Input value={username} onChange={(e) => onUsernameChange(e.target.value)} />
        </div>
        <br />
        <div>
          <div>Email</div>
          <div className='relative'>
            <Input value={email} onChange={(e) => onEmailChange(e.target.value)} />
            <Button type="primary" disable={!checkEmail(email)} className='absolute ml-5 mt-2' onClick={onVerify}>Verify</Button>
          </div>
        </div>
      </div>

      {/* 按钮 */}
      <footer className="mt-10">
        <SignButton
          className="mr-4"
          disable={!verified || !email || !username}
          text="SAVE"
          message={JSON.stringify({ uname: username, email })}
          onSuccess={onSignSuccess}
        />
      </footer>
    </div>
  </section >;

};

export default Uniprofile;
