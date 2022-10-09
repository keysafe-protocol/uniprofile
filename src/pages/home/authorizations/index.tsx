import Table from "components/table/Table"
import { EStatus } from "constants/enum"
import useStores from "hooks/use-stores"
import React, { useMemo } from "react"
const headers1 = ['dapp', 'dapp_addr', 'scope', 'apply_time', 'handles']
const headers = ['dapp', 'dapp_addr', 'scope', 'apply_time', 'da_status', 'handles']

const Authorizations = () => {
  const {
    requestHistoryStore: { requestHistory, pendingRequests },
  } = useStores();
  return <div className="mx-5">
    <div className="w-full lg:w-5/6">
      <h1 className="h-8 font-bold leading-8 text-2xl my-2">Pending Requests</h1>
      <Table headers={headers1} items={pendingRequests} />
    </div>
    <br />
    <br />
    <div className="w-full lg:w-5/6">
      <h1 className="h-8 font-bold leading-8 text-2xl my-2">Requests history</h1>
      <Table headers={headers} items={requestHistory} />
    </div>
  </div>
}
export default Authorizations