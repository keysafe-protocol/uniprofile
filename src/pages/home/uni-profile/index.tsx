import Button from 'components/button';
import Input from 'components/input';
import VerifyEmail from './VerifyEmail';
import React, { useState } from 'react';
import { checkEmail } from 'utils';
import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
const Uniprofile = () => {
  const { library, account } = useEthers()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)
  const [verified, setVerified] = useState(false)
  const onUsernameChange = (value: string) => {
    setUsername(value)
  }
  const onEmailChange = (value: string) => {
    setEmail(value)
  }
  const onSave = async () => {
    const signer = await library?.getSigner()
    const unsignedMessage = JSON.stringify({
      username,
      email
    })
    const signedMessage = await signer?.signMessage(unsignedMessage)

    console.log(signedMessage)
    // let recovered = ethers.utils.verifyMessage(JSON.stringify({
    //   username,
    //   email
    // }), signedMessage!)
    // console.log("recovered", signedMessage)
    // TODO: 调用后端接口, 传入签名前后的数据, 后端可以拿到钱包地址

  }
  const onVerify = () => {
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
            <Button type="primary" className='absolute ml-5 mt-2' onClick={onVerify}>Verify</Button>
          </div>
        </div>
      </div>

      {/* 按钮 */}
      <footer className="mt-10">
        <Button
          className="mr-4"
          type="primary"
          onClick={onSave}
          disable={!verified || !account}
        >
          SAVE
        </Button>
      </footer>
    </div>
  </section>;

};

export default Uniprofile;
