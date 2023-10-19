import css from './header.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Input } from 'antd'
import logo from '../../assets/imgs/cyberlogo-white.png'
import { UnorderedListOutlined } from '@ant-design/icons'
import { NavLink, Link } from 'react-router-dom'
import { layDanhMucKhoaHoc } from '../../services/khoa-hoc.service'
import { useLocation } from 'react-router-dom'
import { getLocalStorage, removeLocalStorage } from '../../utils'
import { ACCESS_TOKEN, HO_TEN, TAI_KHOAN } from '../../constants'
import UserDropdown from '../../components/user-dropdown/user-dropdown'
const { Search } = Input
export default function Header() {
    const [listDanhMucKhoaHoc, setListDanhMucKhoaHoc] = useState<any>([])
    const [hotenUser, setHoTenUser] = useState<any>()

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        fetchMenuItems()
    }, [])
    useEffect(() => {
        setHoTenUser(() => getLocalStorage(HO_TEN))
    }, [location])

    const items: MenuProps['items'] = [...listDanhMucKhoaHoc]
    const fetchMenuItems = async () => {
        const menuItems = await layDanhMucKhoaHoc()
        if (typeof menuItems === 'string') {
            return
        }
        setListDanhMucKhoaHoc(
            menuItems.map((item: any) => ({
                label: (
                    <NavLink
                        to={`/DanhMucKhoaHoc?maDanhMuc=${item.maDanhMuc}&maNhom=GP01`}
                    >
                        {item.tenDanhMuc}
                    </NavLink>
                ),
            })),
        )
    }
    const handleLogout = () => {
        removeLocalStorage(HO_TEN)
        removeLocalStorage(ACCESS_TOKEN)
        removeLocalStorage(TAI_KHOAN)
        setHoTenUser(() => '')
        navigate('/')
    }
    const [searchText, setSearchText] = useState(''); // Trạng thái để lưu trạng thái của trường Input

    const handleSearch = (value: any) => {
        if (value) {
            setSearchText(''); // Cập nhật giá trị searchText nếu có giá trị tìm kiếm
            navigate(`/search?query=${value}`);
        } 
    };
    
    return (
        <div className={css['header']}>
            <div className={css['header__container']}>
                <NavLink to={'/'} className={css['header__container__logo']}>
                    <img src={logo} alt='...' />
                </NavLink>
                <div className={css['header__list-course']}>
                    <Dropdown
                        menu={{ items }}
                        placement='bottom'
                        trigger={['click']}
                    >
                        <Button>
                            <UnorderedListOutlined />
                            Danh sách khoá học
                        </Button>
                    </Dropdown>
                </div>
                <Search
                    className={css['header__search']}
                    placeholder='input search text'
                    onSearch={handleSearch}
                    enterButton
                    value={searchText} // Truyền giá trị vào trường Input
                    onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị khi có sự thay đổi
                />
                {hotenUser ? (
                    <UserDropdown
                        userName={hotenUser}
                        dangXuat={handleLogout}
                    />
                ) : (
                    <div className={css['header__action']}>
                        <Link to='/register'>
                            <Button type='primary'>Đăng kí</Button>
                        </Link>
                        <Link to='/login'>
                            <Button type='primary'>Đăng nhập</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
