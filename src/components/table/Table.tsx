import Button from "components/button"
import { EStatus } from "constants/enum"
import React, { FC } from "react"

interface ITHeader {
  items: string[]
}
const THeader: FC<ITHeader> = ({ items }) => {
  return <thead>
    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
      {items.map((item) => (<th
        className="py-3 px-6 text-left">
        {item}
      </th>))}
    </tr>
  </thead>
}
interface ITRow {
  headers: string[],
  item: { [k: string]: any }
}
const TRow: FC<ITRow> = ({ headers, item }) => {
  return <tr>
    {
      headers.map((header) => <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {header !== 'handles' ? item[header] : <>
          {item.da_status === EStatus.APPROVED && <Button border={false} className="" color="danger" size="mini">Cancel</Button>}
          {item.da_status === EStatus.PENDING && <>
            <Button type="icon" color="success" size="mini">Approve</Button><br />
            <Button type="icon" color="danger" size="mini">Deny</Button>
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
          items.map((item) => <TRow item={item} headers={headers} />) : <div className="w-100 text-center">Empty</div>
      }
    </tbody>
  </table >
}
export default Table