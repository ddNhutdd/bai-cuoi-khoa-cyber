import { Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import Paging from '../../../../components/paging/paging'
import css from './table-khoa-hoc.module.scss'
import { getListCoursesAwaitingApproval } from '../../../../services/user.service'
import { API_STATUS, FIELD_NAME, FIELD_NAME_WIDTH_SPACE } from '../../../../constants'
interface IKhoaHoc {
    key: number
    STT: string
    tenKhoaHoc: string
    maKhoaHoc: string
}
const pageSize = 3
export default function TableKhoaHoc(props: any) {
    const { xacThuc, daGhiDanh, userInfo } = props
    const [apiUserStatus, setApiUserStatus] = useState(API_STATUS.pending)
    const [listDataForTable, setListDataForTable] = useState<any>()
    const [paging_totalPage, setPaging_totalPage] = useState<any>(0)
    const [paging_selectedPage, setPaging_selectedPage] = useState<any>(1)
    useEffect(() => {
        if (xacThuc) {
            setApiUserStatus(API_STATUS.fetching)
            getListCoursesAwaitingApproval(userInfo.taiKhoan)
                ?.then((resp: any) => {
                    API_STATUS.fetchingSuccess
                    const data = resp.data
                    const totalItem = resp.data.length
                    setListDataForTable(() => data)
                    setPaging_totalPage(() => Math.ceil(totalItem / pageSize))
                    setPaging_selectedPage(() => 1)
                })
                .catch((err: any) => {
                    API_STATUS.fetchingError
                    console.log(err)
                })
        } else if (daGhiDanh) {
            //
        }
    }, [userInfo])
    const columns: ColumnsType<IKhoaHoc> = [
        {
            title: FIELD_NAME.stt,
            dataIndex: FIELD_NAME.stt,
            key: FIELD_NAME.stt,
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.tenKhoaHoc,
            dataIndex: FIELD_NAME.tenKhoaHoc,
            key: FIELD_NAME.tenKhoaHoc,
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.xuLi,
            key: FIELD_NAME_WIDTH_SPACE.xuLi,
            render: () => (
                <Space size='middle'>
                    <Button disabled={apiUserStatus === API_STATUS.fetching} type='primary'>Ghi danh</Button>
                    <Button disabled={apiUserStatus === API_STATUS.fetching} type='primary' danger>
                        Huỷ
                    </Button>
                </Space>
            ),
        },
    ]
    const data: IKhoaHoc[] = listDataForTable
        ?.skip((paging_selectedPage - 1) * pageSize)
        .take(pageSize)
        .map((item: any, index: number) => {    
            const newData: IKhoaHoc = {
                key: index,
                STT: 'string',
                tenKhoaHoc: item.tenKhoaHoc,
                maKhoaHoc: item.maKhoaHoc,
            }
            return newData
        })
    return (
        <>
            <p>
                Khoá học {xacThuc && 'chờ xác thực'}
                {daGhiDanh && 'đã ghi danh'}
            </p>
            <div>
                <Table columns={columns} pagination={false} dataSource={data} />
            </div>
            {paging_totalPage > 1 && (
                <div className={css['paging']}>
                    <Paging
                        theme={2}
                        selectedPage={paging_selectedPage}
                        setSelectedPage={setPaging_selectedPage}
                        totalPage={paging_totalPage}
                    />
                </div>
            )}
        </>
    )
}
