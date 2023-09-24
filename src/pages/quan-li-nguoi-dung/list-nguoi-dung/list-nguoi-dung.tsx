import css from './list-nguoi-dung.module.scss'
import { Button, Input, Space, Table, Modal, Dropdown } from 'antd'
import { useState, useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import Paging from '../../../components/paging/paging'
import TableKhoaHoc from './table-khoa-hoc/table-khoa-hoc'
import { getListUserPaging } from '../../../services/user.service'
import { API_STATUS } from '../../../constants'
import { ShowPage } from '../quan-li-nguoi-dung'
interface DataType {
    key: number
    stt: number
    taiKhoan: string
    hoTen: string
    email: string
    soDienThoai: string
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
    const [listUser, setListUser] = useState()
    const [errorFromApi, setErrorFromApi] = useState()
    const [apiUserStatus, setApiUserStatus] = useState<string>(
        API_STATUS.pending,
    )
    const [paging_selectedPage, setPaging_selectedPage] = useState(1)
    const [paging_totalPage, setPaging_totalPage] = useState(0)
    const [searchText, setSearchText] = useState<string>()
    useEffect(() => {
        loadListUser(1)
    }, [])
    useEffect(() => {
        setApiUserStatus(() => API_STATUS.fetchingSuccess)
    }, [listUser])
    useEffect(() => {
        setApiUserStatus(() => API_STATUS.fetchingError)
    }, [errorFromApi])




    useEffect(() => {
        loadListUser(paging_selectedPage,searchText)
    }, [paging_selectedPage])


    useEffect(() => {
        loadListUser(1, searchText)
    }, [searchText])





    const showModal = () => {
        setIsModalOpen(true)
    }
    const closeModel = () => {
        setIsModalOpen(false)
    }
    const loadListUser = (selectedPage: number, search = '') => {
        setApiUserStatus(() => API_STATUS.fetching)
        getListUserPaging(search, selectedPage)
            ?.then((resp) => {
                setListUser(() => resp.data.items)
                setPaging_selectedPage(() => resp.data.currentPage)
                setPaging_totalPage(() => resp.data.totalPages - 1)
            })
            .catch((err) => {
                setErrorFromApi(err)
            })
    }
    const { setShowPage } = props
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
    const data: DataType[] = (listUser ?? []).map((item: any, index) => {
        const newItem: DataType = {
            key: index,
            stt: index + 1,
            taiKhoan: item?.taiKhoan,
            hoTen: item?.hoTen,
            email: item?.email,
            soDienThoai: item?.soDienThoai,
        }
        return newItem
    })
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
                    className={
                        css['list-nguoi-dung__add'] +
                        ' ' +
                        (apiUserStatus === API_STATUS.fetching &&
                            css['disabled'])
                    }
                    onClick={() => {
                        if (apiUserStatus == API_STATUS.fetching) return
                        setShowPage(ShowPage.add)
                    }}
                >
                    Thêm người dùng
                </span>
                <form>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setSearchText(e.target.value)
                            }}
                            value={searchText}
                            placeholder='Nhập vào tên tài khoản hoặc họ tên người dùng'
                        />
                    </Space.Compact>
                </form>
                <Table columns={columns} pagination={false} dataSource={data} />
                {paging_totalPage > 1 && (
                    <div className={css['paging']}>
                        <Paging
                            theme={2}
                            totalItem={paging_totalPage}
                            selectedPage={paging_selectedPage}
                            setSelectedPage={setPaging_selectedPage}
                        />
                    </div>
                )}
            </div>
            <Modal
                maskClosable={false}
                open={isModalOpen}
                closeIcon={<CloseOutlined onClick={closeModel} />}
                footer={
                    <Button onClick={closeModel} type='primary'>
                        Close
                    </Button>
                }
                width={'95%'}
            >
                <div className={css['list-nguoi-dung-model']}>
                    <p>Chọn khoá học</p>
                    <div className={css['modal-khoa-hoc-dropdown']}>
                        <div className={css['dropdown-container']}>
                            <Dropdown
                                menu={menuDanhMucProps}
                                trigger={['click']}
                            >
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
