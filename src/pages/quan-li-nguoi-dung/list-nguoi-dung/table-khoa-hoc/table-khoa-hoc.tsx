import { Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import Paging from '../../../../components/paging/paging'
import css from './table-khoa-hoc.module.scss'
import { getListCoursesAwaitingApproval } from '../../../../services/user.service'
interface DataType {
    stt: string
    tenKhoaHoc: string
    key: string
}
export default function TableKhoaHoc(props: any) {
    const { xacThuc, daGhiDanh, userInfo } = props
    useEffect(() => {
        if (xacThuc) {
            getListCoursesAwaitingApproval(userInfo.taiKhoan)
                ?.then((resp: any) => {
                    console.log('fdsa', resp.data)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        } else if (daGhiDanh) {
            //
        }
    }, [userInfo])
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên khoá học',
            dataIndex: 'tenKhoaHoc',
            key: 'tenKhoaHoc',
        },
        {
            title: 'Xử lí',
            key: 'Xử lí',
            render: () => (
                <Space size='middle'>
                    <Button type='primary'>Ghi danh</Button>
                    <Button type='primary' danger>
                        Huỷ
                    </Button>
                </Space>
            ),
        },
    ]
    const data: DataType[] = [
        {
            key: '..',
            stt: '1',
            tenKhoaHoc: 'New York No. 1 Lake Park',
        },
        {
            key: '.',
            stt: '1',
            tenKhoaHoc: 'London No. 1 Lake Park',
        },
        {
            key: '...',
            stt: '1',
            tenKhoaHoc: 'Sydney No. 1 Lake Park',
        },
    ]
    return (
        <>
            <p>
                Khoá học {xacThuc && 'chờ xác thực'}
                {daGhiDanh && 'đã ghi danh'}
            </p>
            <div>
                <Table columns={columns} pagination={false} dataSource={data} />
            </div>
            <div className={css['paging']}>
                <Paging
                    theme={2}
                    selectedPage={2}
                    setSelectedPage={() => {}}
                    totalItem={10}
                />
            </div>
        </>
    )
}
