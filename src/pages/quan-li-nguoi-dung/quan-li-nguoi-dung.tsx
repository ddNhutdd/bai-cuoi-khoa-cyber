import { useState } from 'react'
import ListNguoiDung from './list-nguoi-dung/list-nguoi-dung'
import ThemSuaNguoiDung from './them-sua-nguoi-dung/them-sua-nguoi-dung'
export enum ShowPage {
    list,
    add,
    update,
}
export default function QuanLiNguoiDung() {
    const [showPage, setShowPage] = useState(ShowPage.list)
    const render = () => {
        switch (showPage) {
            case ShowPage.list:
                return <ListNguoiDung setShowPage={setShowPage} />
            case ShowPage.add:
                return (
                    <ThemSuaNguoiDung
                        showPage={showPage}
                        setShowPage={setShowPage}
                    />
                )
            case ShowPage.update:
                return (
                    <ThemSuaNguoiDung
                        showPage={showPage}
                        setShowPage={setShowPage}
                    />
                )
            default:
                break
        }
    }
    return <>{render()}</>
}
