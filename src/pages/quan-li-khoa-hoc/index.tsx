import { useState } from "react"
import { Input } from 'antd'
import ThemKhoaHoc from "./them-khoa-hoc"
import ListKhoaHoc from "./ds-khoa-hoc"
const { Search } = Input
export enum isPage {
  list,
  add,
  update
}

export default function QuanLiKhoaHoc() {
  const [page, setPage] = useState(isPage.list)
  const render = () => {
    switch (page) {
      case isPage.list:
        return <ListKhoaHoc setPage={setPage}/>
      case isPage.add:
        return <ThemKhoaHoc />
      default:
        break
    }
  }
  return <div>{render()}</div>
}
