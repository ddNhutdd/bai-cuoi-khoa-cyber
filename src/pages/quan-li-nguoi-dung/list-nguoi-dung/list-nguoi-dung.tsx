import css from './list-nguoi-dung.module.scss'
import { Button, Input, Space, Table, Modal, Dropdown } from 'antd'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import Paging from '../../../components/paging/paging'
import TableKhoaHoc from './table-khoa-hoc/table-khoa-hoc'
interface DataType {
    stt: string
    id: string
    taiKhoan: string
    hoTen: string
    email: string
    soDienThoai: string
    key: string
}
const itemsDanhMuc: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
]
export default function ListNguoiDung(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const closeModel = () => {
        setIsModalOpen(false)
    }
    const { setShow } = props
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            key: 'soDienThoai',
        },
        {
            title: 'Xử lí',
            key: 'Xử lí',
            render: () => (
                <Space size='middle'>
                    <Button type='primary' onClick={showModal}>
                        Ghi danh
                    </Button>
                    <Button type='primary'>Sửa</Button>
                    <Button type='primary' ghost>
                        Xoá
                    </Button>
                </Space>
            ),
        },
    ]
    const data: DataType[] = [
        {
            key: '..',
            stt: '1',
            id: '1',
            taiKhoan: '',
            hoTen: 'John Brown',
            email: '32',
            soDienThoai: 'New York No. 1 Lake Park',
        },
        {
            key: '.',
            stt: '1',
            id: '1',
            taiKhoan: '',
            hoTen: 'Jim Green',
            email: '32',
            soDienThoai: 'London No. 1 Lake Park',
        },
        {
            key: '...',
            stt: '1',
            id: '1',
            taiKhoan: '',
            hoTen: 'Joe Black',
            email: '32',
            soDienThoai: 'Sydney No. 1 Lake Park',
        },
    ]
    const handleMenuDanhMucClick: MenuProps['onClick'] = (e) => {
        let menuItem: any = itemsDanhMuc?.find(
            (item: any) => item?.key === e.key,
        )
        if (menuItem) {
            menuItem = menuItem.label
        }
        console.log('click', e, menuItem)
        // setLa(menuItem)
    }
    const menuDanhMucProps = {
        items: itemsDanhMuc,
        onClick: handleMenuDanhMucClick,
    }
    return (
        <>
            <div className={css['list-nguoi-dung']}>
                <span
                    className={css['list-nguoi-dung__add']}
                    onClick={() => {
                        setShow(1)
                    }}
                >
                    Thêm người dùng
                </span>
                <form>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder='Nhập vào tên tài khoản hoặc họ tên người dùng' />
                        <Button type='primary'>Tìm</Button>
                    </Space.Compact>
                </form>
                <Table columns={columns} pagination={false} dataSource={data} />
                <div className={css['paging']}>
                    <Paging
                        theme={2}
                        totalItem={10}
                        selectedPage={3}
                        setSelectedPage={() => {}}
                    />
                </div>
            </div>
            <Modal
                maskClosable={false}
                open={isModalOpen}
                closeIcon={<CloseOutlined onClick={closeModel} />}
                footer={<Button onClick={closeModel} type='primary'>Close</Button>}
                width={'95%'}
            >
                <div className={css['list-nguoi-dung-model']}>
                <p>Chọn khoá học</p>
                <div className={css['modal-khoa-hoc-dropdown']}>
                    <div className={css['dropdown-container']}>
                        <Dropdown menu={menuDanhMucProps} trigger={['click']}>
                            <Button>
                                <Space>
                                    la
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div>
                        <Button type='primary'>Ghi danh</Button>
                    </div>
                </div>
                <div className={css['model-khoa-hoc-line']}></div>
                <TableKhoaHoc />
                <div className={css['model-khoa-hoc-line']}></div>
                <TableKhoaHoc />
                </div>
            </Modal>
        </>
    )
}
