import css from './list-nguoi-dung.module.scss'
import { useDispatch } from 'react-redux'
import { selectUserForUpdate } from '../../../redux/slices/user.slice'
import { Button, Input, Space, Table, Modal, Dropdown } from 'antd'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import Paging from '../../../components/paging/paging'
import TableKhoaHoc from './table-khoa-hoc/table-khoa-hoc'
import {
    deleteUser,
    getCoursesNotEnrolled,
    getListUserPaging,
} from '../../../services/user.service'
import { API_STATUS, COMMON_MESSAGE } from '../../../constants'
import { ShowPage } from '../quan-li-nguoi-dung'
interface DataType {
    key: number
    stt: number
    taiKhoan: string
    hoTen: string
    email: string
    soDienThoai: string
    maLoaiNguoiDung: string
}
let itemsDanhMuc: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
]
export default function ListNguoiDung(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listUser, setListUser] = useState()
    const [errorFromApi, setErrorFromApi] = useState()
    const [userRegisterCourse, setUserRegisterCourse] = useState<any>()
    const [dropdownCourseSelected, setDropdownCourseSelected] = useState<any>()
    const [apiUserStatus, setApiUserStatus] = useState<string>(
        API_STATUS.pending,
    )
    const [paging_selectedPage, setPaging_selectedPage] = useState(1)
    const [paging_totalPage, setPaging_totalPage] = useState(0)
    const [searchText, setSearchText] = useState<string>()
    const dispatch = useDispatch()
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
        loadListUser(paging_selectedPage, searchText)
    }, [paging_selectedPage])
    useEffect(() => {
        loadListUser(1, searchText)
    }, [searchText])
    useEffect(() => {
        if (userRegisterCourse) {
            setApiUserStatus(() => API_STATUS.fetching)
            getCoursesNotEnrolled(userRegisterCourse.taiKhoan)
                ?.then((resp) => {
                    setApiUserStatus(() => API_STATUS.fetchingSuccess)
                    itemsDanhMuc = resp.data.map((item: any) => {
                        return {
                            label: item.tenKhoaHoc,
                            key: item.maKhoaHoc + ',' + item.tenKhoaHoc,
                        }
                    })
                    if (itemsDanhMuc) {
                        setDropdownCourseSelected(itemsDanhMuc[0]?.key)
                    }
                })
                .catch((err) => {
                    setApiUserStatus(API_STATUS.fetchingError)
                    toast.error(err.response.data, alertConfig)
                    closeModel()
                })
        }
    }, [userRegisterCourse])
    const alertConfig: any = {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    }
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
                setPaging_totalPage(() => resp.data.totalPages)
            })
            .catch((err) => {
                setErrorFromApi(err)
            })
    }
    const { setShowPage } = props
    const deleteUserHandle = (taiKhoan: string) => {
        setApiUserStatus(() => API_STATUS.fetching)
        deleteUser(taiKhoan)
            ?.then(() => {
                setApiUserStatus(() => API_STATUS.fetchingSuccess)
                toast.success(COMMON_MESSAGE.thanhCong, alertConfig)
                loadListUser(paging_selectedPage, searchText)
            })
            .catch((err: any) => {
                setApiUserStatus(() => API_STATUS.fetchingError)
                toast.error(err.response.data, alertConfig)
            })
    }
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
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        onClick={() => {
                            setUserRegisterCourse(() => record)
                            showModal()
                        }}
                    >
                        Ghi danh
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            dispatch(selectUserForUpdate(record))
                            setShowPage(ShowPage.update)
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type='primary'
                        ghost
                        onClick={() => {
                            deleteUserHandle(record.taiKhoan)
                        }}
                    >
                        Xoá
                    </Button>
                </Space>
            ),
        },
    ]
    const data: DataType[] = (listUser ?? []).map((item: any, index) => {
        const newItem: DataType = {
            key: index,
            stt: (paging_selectedPage - 1) * 10 + index + 1,
            taiKhoan: item?.taiKhoan,
            hoTen: item?.hoTen,
            email: item?.email,
            soDienThoai: item?.soDT,
            maLoaiNguoiDung: item.maLoaiNguoiDung,
        }
        return newItem
    })
    const handleMenuDanhMucClick: MenuProps['onClick'] = (e) => {
        setDropdownCourseSelected(e.key)
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
                                overlayStyle={{
                                    maxHeight: '250',
                                    overflowY: 'auto',
                                }}
                            >
                                <Button>
                                    <Space>
                                        {dropdownCourseSelected?.split(',')[1]}
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
            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </>
    )
}
