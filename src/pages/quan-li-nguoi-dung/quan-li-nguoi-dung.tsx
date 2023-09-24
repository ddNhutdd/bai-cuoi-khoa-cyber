import { useState } from 'react'
import ListNguoiDung from './list-nguoi-dung/list-nguoi-dung'
import ThemSuaNguoiDung from './them-sua-nguoi-dung/them-sua-nguoi-dung'
export default function QuanLiNguoiDung() {
    const [show, setShow] = useState(0)
    const render = () => {
        switch (show) {
            case 0:
                return <ListNguoiDung setShow={setShow}/>
            case 1:
                return <ThemSuaNguoiDung show setShow={setShow} />
            default:
                break
        }
    }
    return <>{render()}</>
}
