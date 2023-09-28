import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import css from './admin.template.module.scss'
import logo from '../../assets/imgs/logonobg.png'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useState, useEffect } from 'react'
import { BarsIcon, LearnIcon, UserFill } from '../../assets/icons/icons'
import { getLocalStorage, removeLocalStorage } from '../../utils'
import {
    ACCESS_TOKEN,
    HO_TEN,
    MA_LOAI_NGUOI_DUNG,
    TAI_KHOAN,
} from '../../constants'
export default function AdminTemplate() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    useEffect(() => {
        const typeOfUser = getLocalStorage(MA_LOAI_NGUOI_DUNG)
        if (!typeOfUser) {
            navigate('/login')
        }
    }, [])
    const logoutHandle = () => {
        removeLocalStorage(ACCESS_TOKEN)
        removeLocalStorage(TAI_KHOAN)
        removeLocalStorage(HO_TEN)
        removeLocalStorage(MA_LOAI_NGUOI_DUNG)
        navigate('/')
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <NavLink to={'/profile'}>Cập nhật thông tin</NavLink>,
        },
        {
            key: '2',
            label: <span onClick={logoutHandle}>Đăng xuất</span>,
        },
    ]
    return (
        <>
            <div className={css['admin-template-container']}>
                <div
                    className={
                        css['admin-template-container__side-left'] +
                        ' ' +
                        (showSideBar && css['--mw-4'])
                    }
                >
                    <div>
                        <NavLink to={'/'}>
                            <img
                                className={showSideBar ? css['--dn'] : ''}
                                src={logo}
                                alt='...'
                            />
                        </NavLink>
                        <p className={showSideBar ? css['--dn'] : ''}>
                            Dashboard
                        </p>
                        <span
                            className={showSideBar ? css['--ma'] : ''}
                            onClick={() => {
                                setShowSideBar((s) => !s)
                            }}
                        >
                            <BarsIcon />
                        </span>
                    </div>
                    <ul>
                        <li className={showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/'}>Quản lý khóa học</NavLink>
                        </li>
                        <li className={showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/admin/quanlinguoidung'}>
                                Quản lý người dùng
                            </NavLink>
                        </li>
                        <li className={!showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/'}>
                                <LearnIcon />
                            </NavLink>
                        </li>
                        <li className={!showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/admin/quanlinguoidung'}>
                                <UserFill />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={css['admin-template-container__side-right']}>
                    <div className={css['admin-template-container__top']}>
                        <p>Xin chào: Haf</p>
                        <Dropdown menu={{ items }} placement='bottom'>
                            <div
                                className={
                                    css['admin-template-container__logoUser']
                                }
                            >
                                <img src={logo} alt='...' />
                            </div>
                        </Dropdown>
                    </div>
                    <div className={css['admin-template-container__content']}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}