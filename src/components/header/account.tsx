import { shortenIfAddress, useEthers } from "@usedapp/core"
import Dropdown from "rc-dropdown"
import Menu from "rc-menu"
import React from "react"
import { FC } from "react"
import arrowIcon from "assets/imgs/arrow-down.svg";

const WalletAccount: FC = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  return <div>

    {!account ? (
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect to wallet</button>
      </div>
    ) : (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="disconnect">
              <span
                onClick={deactivate}
                className="text-base font-bold cursor-pointer"
              >
                Disconnect
              </span>
            </Menu.Item>
          </Menu>
        }
      >
        {/* {pathname === ROUTES.TRANSFER ? transferLinks[1] : transferLinks[0]} */}
        <span className="flex items-center cursor-pointer">
          {shortenIfAddress(account)}
          <img src={arrowIcon} className="ml-2 w-3" alt="" />
        </span>
      </Dropdown>
    )}

  </div>
}
export default WalletAccount;