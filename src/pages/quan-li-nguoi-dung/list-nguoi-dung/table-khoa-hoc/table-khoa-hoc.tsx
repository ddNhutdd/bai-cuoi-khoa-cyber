import { Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import {
    getListCoursesApproved,
    getListCoursesAwaitingApproval,
} from '../../../../services/user.service'
import {
    ALERT_CONFIG,
    API_STATUS,
    COMMON_MESSAGE,
    FIELD_NAME,
    FIELD_NAME_WIDTH_SPACE,
} from '../../../../constants'
import {
    ghiDanhKhoaHoc,
    huyGhiDanh,
} from '../../../../services/khoa-hoc.service'
interface IKhoaHoc {
    key: string
    STT: number
    tenKhoaHoc: string
    maKhoaHoc: string
}
const pageSize = 5
export default function TableKhoaHoc(props: any) {
    const {
        xacThuc,
        daGhiDanh,
        userInfo,
        re_render,
        setRe_renderTableDaGhiDanh,
        setRe_renderLoadListCoursesNotEnrolledForDropdown,
    } = props
    const [apiUserStatus, setApiUserStatus] = useState(API_STATUS.pending)
    const [listDataForTable, setListDataForTable] = useState<any>()
    const [paging_totalItems, setPaging_totalItems] = useState<any>(0)
    const [paging_selectedPage, setPaging_selectedPage] = useState<any>(1)
    useEffect(() => {
        loadDataForTable()
        setPaging_selectedPage(() => 1)
    }, [userInfo])
    useEffect(() => {
        loadDataForTable()
        setPaging_selectedPage(() => 1)
    }, [re_render])
    const loadDataForTable = () => {
        if (xacThuc) {
            setApiUserStatus(API_STATUS.fetching)
            getListCoursesAwaitingApproval(userInfo.taiKhoan)
                ?.then((resp: any) => {
                    setApiUserStatus(API_STATUS.fetchingSuccess)
                    const data = resp.data
                    const totalPages = Math.ceil(data.length / pageSize)
                    if (paging_selectedPage > totalPages) {
                        setPaging_selectedPage(totalPages)
                    }
                    setPaging_totalItems(() => data.length)
                    setListDataForTable(() => data)
                })
                .catch((err: any) => {
                    setApiUserStatus(API_STATUS.fetchingError)
                    console.log(err)
                })
        } else if (daGhiDanh) {
            setApiUserStatus(API_STATUS.fetching)
            getListCoursesApproved(userInfo.taiKhoan)
                ?.then((resp: any) => {
                    setApiUserStatus(API_STATUS.fetchingSuccess)
                    const data = resp.data
                    const totalPages = Math.ceil(data.length / pageSize)
                    if (paging_selectedPage > totalPages) {
                        setPaging_selectedPage(totalPages)
                    }
                    setListDataForTable(() => data)
                    setPaging_totalItems(() => data.length)
                })
                .catch((err: any) => {
                    setApiUserStatus(API_STATUS.fetchingError)
                    console.log(err)
                })
        }
    }
    const huyClickHandle = (record: any) => {
        setApiUserStatus(() => API_STATUS.fetching)
        huyGhiDanh(record.maKhoaHoc, userInfo.taiKhoan)
            ?.then((resp: any) => {
                toast.success(resp.data, ALERT_CONFIG)
                loadDataForTable()
                setRe_renderLoadListCoursesNotEnrolledForDropdown(
                    (value: number) => ++value,
                )
            })
            .catch((err: any) => {
                toast.error(COMMON_MESSAGE.thatBai, ALERT_CONFIG)
                setApiUserStatus(API_STATUS.fetchingError)
                console.log(err)
            })
    }
    const xacThucClickHandle = (record: any) => {
        setApiUserStatus(() => API_STATUS.fetching)
        ghiDanhKhoaHoc(record.maKhoaHoc, userInfo.taiKhoan)
            ?.then((resp: any) => {
                toast.success(resp.data, ALERT_CONFIG)
                setRe_renderTableDaGhiDanh((c: number) => ++c)
                loadDataForTable()
            })
            .catch((err: any) => {
                setApiUserStatus(API_STATUS.fetchingError)
                toast.error(COMMON_MESSAGE.thatBai, ALERT_CONFIG)
                console.log(err)
            })
    }
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
            render: (_, record) => (
                <Space size='middle'>
                    {xacThuc && (
                        <Button
                            onClick={() => xacThucClickHandle(record)}
                            disabled={apiUserStatus === API_STATUS.fetching}
                            type='primary'
                        >
                            Ghi danh
                        </Button>
                    )}
                    <Button
                        disabled={apiUserStatus === API_STATUS.fetching}
                        type='primary'
                        danger
                        onClick={() => huyClickHandle(record)}
                    >
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
                key: item.maKhoaHoc,
                STT: (paging_selectedPage - 1) * pageSize + index + 1,
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
                <Table
                    columns={columns}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize,
                        total: paging_totalItems,
                        current: paging_selectedPage <= 0 ? 1 : paging_selectedPage,
                        onChange: (page) => {
                            setPaging_selectedPage(page)
                        },
                    }}
                    dataSource={data}
                />
            </div>
        </>
    )
}
