import { useEthers } from "@usedapp/core"
import Button from "components/button"
import { EStatus } from "constants/enum"
import useStores from "hooks/use-stores"
import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import authorizationService from "stores/authorization/services"
import notify from "../../utils/message";

interface ITHeader {
  items: string[]
}
const getText = (key: string) => {
  const texts: any = {
    'dapp': "Dapp", 'dapp_addr': "Address", 'scope': "Scope", 'apply_time': "Apply Time", 'da_status': "Status", 'handles': "Actions"
  }
  return texts[key]
}
const THeader: FC<ITHeader> = ({ items }) => {
  return <thead>
    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
      {items.map((item) => (<th
        className="py-3 px-6 text-left">
        {getText(item)}
      </th>))}
    </tr>
  </thead>
}
interface ITRow {
  headers: string[],
  item: { [k: string]: any }
}
const TRow: FC<ITRow> = ({ headers, item }) => {
  const { library, account } = useEthers()
  const navigate = useNavigate();

  const {
    requestHistoryStore,
    requestHistoryStore: { requestHistory, loadRequestAuthList },
  } = useStores();
  const handleClick = async (did: number, handle: EStatus) => {
    const _data = {
      handle,
      did
    }
    const message = JSON.stringify(_data)
    if (!account) {
      return notify({
        content: "Please connect your wallet"
      });
    }


    const signer = await library?.getSigner()
    console.log(signer)
    const sig = await signer?.signMessage(message!)
    try {
      await authorizationService.dAuthPermit({ sig: sig!, data: _data, account })
      await requestHistoryStore.loadRequestAuthList(account)
      navigate("/?active=authorizations")
    } catch (error) {
      console.log(error)
    }

  }
  const getStatus = (handle: string) => {
    const status: any = {
      "-2": "Canceled",
      "-1": "Denied",
      "0": "Pending",
      "1": "Approved"
    }
    return status[handle]
  }

  return <tr>
    {
      headers.map((header) => <td key={header} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {header !== 'handles' ? header === 'da_status' ? getStatus(item['da_status']) : item[header] : <>
          {item.da_status === EStatus.APPROVED && <Button border={false} className="" color="danger" size="mini" onClick={() => { handleClick(item.did, EStatus.CANCELED) }}>Cancel</Button>}
          {item.da_status === EStatus.PENDING && <>
            <Button type="icon" color="success" size="mini" onClick={() => { handleClick(item.did, EStatus.APPROVED) }}>Approve</Button><br />
            <Button type="icon" color="danger" size="mini" onClick={() => { handleClick(item.did, EStatus.DENIED) }}>Deny</Button>
          </>
          }
        </>}
      </td>)
    }
  </tr >
}
interface ITable {
  headers: string[]
  items: any[],
}
const Table: FC<ITable> = ({ headers, items }) => {
  return <table className="min-w-max w-full table-auto">
    <THeader items={headers} />

    <tbody>
      {
        items.length !== 0 ?
          items.map((item) => <TRow key={item.did} item={item} headers={headers} />) : <div className="w-100 text-center">Empty</div>
      }
    </tbody>
  </table >
}
export default Table