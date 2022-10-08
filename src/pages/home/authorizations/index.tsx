import Button from "components/button"
import Table from "components/table/Table"
import { EStatus } from "constants/enum"
import useStores from "hooks/use-stores"
import React from "react"
const headers = ['dapp', 'dapp_pub_addr', 'scope', 'apple_time', 'da_status', 'handles']
const items = [
  {
    kid: "c1",
    dapp: '0xxxxxx',
    dapp_pub_addr: '12212',
    scope: 'scope',
    apple_time: '20202',
    da_status: 0
  },
  {
    kid: "c1",
    dapp: '0xxxxxx',
    dapp_pub_addr: '12212',
    scope: 'scope',
    apple_time: '20202',
    da_status: 1
  }
]

const Authorizations = () => {
  const {
    requestHistoryStore: { requestHistory },
  } = useStores();
  const pendingItem = requestHistory.filter((item) => item.da_status === EStatus.PENDING)
  const history = requestHistory.filter((item) => item.da_status !== EStatus.PENDING)
  return <div className="mx-5">
    <div className="w-full lg:w-5/6">
      <h1 className="h-8 font-bold leading-8 text-2xl my-2">Pending Requests</h1>
      <Table headers={headers} items={pendingItem} />
    </div>
    <br />
    <br />
    <div className="w-full lg:w-5/6">
      <h1 className="h-8 font-bold leading-8 text-2xl my-2">Requests history</h1>
      <Table headers={headers} items={history} />
    </div>
  </div>
}
export default Authorizations