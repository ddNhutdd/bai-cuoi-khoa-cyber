import css from './list-nguoi-dung.module.scss'
import { useDispatch } from 'react-redux'
import { ghiDanhKhoaHoc } from '../../../services/khoa-hoc.service'
import { selectUserForUpdate } from '../../../redux/slices/user.slice'
import { Button, Input, Space, Table, Modal, Dropdown } from 'antd'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import TableKhoaHoc from './table-khoa-hoc/table-khoa-hoc'
import {
    deleteUser,
    getCoursesNotEnrolled,
    getListUserPaging,
} from '../../../services/user.service'
import {
    ALERT_CONFIG,
    API_STATUS,
    COMMON_MESSAGE,
    FIELD_NAME,
    FIELD_NAME_WIDTH_SPACE,
} from '../../../constants'
import { ShowPage } from '../quan-li-nguoi-dung'
import { debounce, scrollToSmooth } from '../../../utils'
interface IUser {
    key: number
    STT: number
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
    const [userRegisterCourse, setUserRegisterCourse] = useState<any>()
    const [dropdownCourseSelected, setDropdownCourseSelected] = useState<any>()
    const [apiUserStatus, setApiUserStatus] = useState<string>(
        API_STATUS.pending,
    )
    const [paging_selectedPage, setPaging_selectedPage] = useState(1)
    const [paging_totalItems, setPaging_totalItems] = useState(0)
    const [searchText, setSearchText] = useState<string>()
    const [re_renderTableDaGhiDanh, setRe_renderTableDaGhiDanh] =
        useState<number>(0)
    const dispatch = useDispatch()
    useEffect(() => {
        loadListUser(1)
    }, [])
    useEffect(() => {
        setApiUserStatus(() => API_STATUS.fetchingSuccess)
    }, [listUser])
    useEffect(() => {
        loadListUser(paging_selectedPage, searchText)
        scrollToSmooth()
    }, [paging_selectedPage])
    useEffect(() => {
        if (userRegisterCourse) {
            loadListCoursesNotEnrolledForDropdown()
        }
    }, [userRegisterCourse])
    const loadListCoursesNotEnrolledForDropdown = () => {
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
                closeModel()
                toast.error(err.response.data, ALERT_CONFIG)
            })
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
                setPaging_totalItems(() => resp.data.totalCount)
            })
            .catch((err) => {
                setApiUserStatus(() => API_STATUS.fetchingError)
                console.log(err)
            })
    }
    const { setShowPage } = props
    const deleteUserHandle = (taiKhoan: string) => {
        setApiUserStatus(() => API_STATUS.fetching)
        deleteUser(taiKhoan)
            ?.then(() => {
                setApiUserStatus(() => API_STATUS.fetchingSuccess)
                toast.success(COMMON_MESSAGE.thanhCong, ALERT_CONFIG)
                loadListUser(paging_selectedPage, searchText)
            })
            .catch((err: any) => {
                setApiUserStatus(() => API_STATUS.fetchingError)
                toast.error(err.response.data, ALERT_CONFIG)
            })
    }
    const columns: ColumnsType<IUser> = [
        {
            title: FIELD_NAME.stt,
            dataIndex: FIELD_NAME.stt,
            key: FIELD_NAME.stt,
            width: '5%',
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.taiKhoan,
            dataIndex: FIELD_NAME.taiKhoan,
            key: FIELD_NAME.taiKhoan,
            width: '19%',
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.hoTen,
            dataIndex: FIELD_NAME.hoTen,
            key: FIELD_NAME.hoTen,
            width: '19%',
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.email,
            dataIndex: FIELD_NAME.email,
            key: FIELD_NAME.email,
            width: '19%',
        },
        {
            title: FIELD_NAME_WIDTH_SPACE.soDienThoai,
            dataIndex: FIELD_NAME.soDienThoai,
            key: FIELD_NAME.soDienThoai,
            width: '19%',
        },
        {
            title: 'Xử lí',
            key: 'Xử lí',
            render: (_, record) => (
                <Space
                    size='middle'
                    className={css['list-nguoi-dung__xu-li-cell']}
                >
                    <Button
                        disabled={apiUserStatus === API_STATUS.fetching}
                        type='primary'
                        onClick={() => {
                            setUserRegisterCourse(() => record)
                            showModal()
                        }}
                    >
                        Ghi danh
                    </Button>
                    <Button
                        disabled={apiUserStatus === API_STATUS.fetching}
                        type='primary'
                        onClick={() => {
                            dispatch(selectUserForUpdate(record))
                            setShowPage(ShowPage.update)
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        disabled={apiUserStatus === API_STATUS.fetching}
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
            width: '19%',
        },
    ]
    const data: IUser[] = (listUser ?? []).map((item: any, index) => {
        const newItem: IUser = {
            key: index,
            STT: (paging_selectedPage - 1) * 10 + index + 1,
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
    const buttonGhiDanhClickHandle = () => {
        const taiKhoan = userRegisterCourse.taiKhoan
        const khoaHoc = dropdownCourseSelected?.split(',')[0]
        setApiUserStatus(API_STATUS.fetching)
        ghiDanhKhoaHoc(khoaHoc, taiKhoan)
            ?.then((resp: any) => {
                loadListCoursesNotEnrolledForDropdown()
                toast.success(resp.data, ALERT_CONFIG)
                setRe_renderTableDaGhiDanh((c) => ++c)
                setApiUserStatus(API_STATUS.fetchingSuccess)
            })
            .catch((err: any) => {
                setApiUserStatus(API_STATUS.fetchingError)
                toast.error(
                    err.response.data || COMMON_MESSAGE.thatBai,
                    ALERT_CONFIG,
                )
            })
    }
    const loadListUserDebounced = useCallback(debounce(loadListUser, 1000), [])
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
                                loadListUserDebounced(1, e.target.value)
                            }}
                            value={searchText}
                            placeholder={
                                COMMON_MESSAGE.nhapVaoTaiKhoanHocTenNguoiDung
                            }
                        />
                    </Space.Compact>
                </form>
                <div className={css['list-nguoi-dung__table-container']}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            position: ['bottomRight'],
                            pageSize: 10,
                            total: paging_totalItems,
                            showSizeChanger: false,
                            onChange: (page) => {
                                setPaging_selectedPage(page)
                            },
                        }}
                    />
                </div>
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
                                    maxHeight: '250px',
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
                            <Button
                                disabled={apiUserStatus === API_STATUS.fetching}
                                type='primary'
                                onClick={buttonGhiDanhClickHandle}
                            >
                                Ghi danh
                            </Button>
                        </div>
                    </div>
                    <div className={css['model-khoa-hoc-line']}></div>
                    <TableKhoaHoc
                        xacThuc
                        setRe_renderTableDaGhiDanh={setRe_renderTableDaGhiDanh}
                        userInfo={userRegisterCourse}
                    />
                    <div className={css['model-khoa-hoc-line']}></div>
                    <TableKhoaHoc
                        re_render={re_renderTableDaGhiDanh}
                        daGhiDanh
                        userInfo={userRegisterCourse}
                    />
                </div>
            </Modal>
        </>
    )
}
