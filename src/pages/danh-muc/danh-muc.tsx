import ListCard from '../../components/list-card/list-card'
import Paging from '../../components/paging/paging'
import { ITEM_PER_PAGE } from '../../constants'
import { layKhoaHocTheoDanhMuc } from '../../services/khoa-hoc.service'
import css from './danh-muc.module.scss'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { scrollToSmooth } from '../../utils'
export default function DanhMuc() {
    const [listKhoaHoc, setListKhoaHoc] = useState<any>()
    const [paging_show, setPaging_show] = useState<any>()
    const [paging_totalItem, setPaging_totalItem] = useState(0)
    const [paging_selectedPage, setPaging_selectedPage] = useState(1)
    const [queryParameters] = useSearchParams()
    const MaKhoaHoc = queryParameters.get('maDanhMuc')
    const MaNhom = queryParameters.get('maNhom')
    useEffect(() => {
        fetchData(MaKhoaHoc ?? '', MaNhom ?? 'PG01')
    }, [MaKhoaHoc, MaNhom])
    useEffect(() => {
        setPaging_selectedPage(1)
        showItemWithPageChange()
    }, [listKhoaHoc])
    useEffect(() => {
        showItemWithPageChange()
        scrollToSmooth()
    }, [paging_selectedPage])
    const fetchData = async (maKhoaHoc: string, maNhom: string) => {
        const data = await layKhoaHocTheoDanhMuc(maKhoaHoc, maNhom)
        if (typeof data === 'string') {
            return
        }
        setListKhoaHoc(() => data)
        setPaging_totalItem(() => data.length)
    }
    const showItemWithPageChange = () => {
        const items = listKhoaHoc?.skip((paging_selectedPage - 1) * 12).take(ITEM_PER_PAGE)
        setPaging_show(() => items)
    }
    return (
        <>
            <div className={css['danh-muc']}>
                <div className={css['danh-muc__title']}>
                    <h1>LẬP TRÌNH FRONTEND</h1>
                </div>
                <div className={css['danh-muc__container']}>
                    <h3>Các khoá học phổ biến</h3>
                    <ListCard list={paging_show} />
                    <div className={css['danh-muc__paging']}>
                        {paging_totalItem >= 1 && (
                            <Paging
                                theme={1}
                                totalPage={Math.ceil(
                                    paging_totalItem / ITEM_PER_PAGE,
                                )}
                                selectedPage={paging_selectedPage}
                                setSelectedPage={setPaging_selectedPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
