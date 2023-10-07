import { useState } from "react"
import ThemKhoaHoc from "./them-khoa-hoc"
import ListKhoaHoc from "./ds-khoa-hoc"
import GhiDanh from "./ghi-danh-kh"
export enum isPage {
  list,
  add,
  ghiDanh
}

export default function QuanLiKhoaHoc() {
  const [page, setPage] = useState(isPage.list)
  const [maKhoaHoc, setMaKhoaHoc] = useState("");
  const render = () => {
    switch (page) {
      case isPage.list:
        return <ListKhoaHoc setPage={setPage} setMaKhoaHoc={setMaKhoaHoc}/>
      case isPage.add:
        return <ThemKhoaHoc />
      case isPage.ghiDanh:
        return <GhiDanh maKhoaHoc={maKhoaHoc}/>
      default:
        break
    }
  }
  return <div>{render()}</div>
}
