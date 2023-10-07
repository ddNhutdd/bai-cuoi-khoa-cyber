import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
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
    URL_NAVIGATE,
} from '../../constants'
export default function AdminTemplate() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const [nameLogedUser, setNameLogedUser] = useState()
    const isWidth768 = useMediaQuery({ query: '(max-width: 768px)' })
    useEffect(() => {
        const typeOfUser = getLocalStorage(MA_LOAI_NGUOI_DUNG)
        if (!typeOfUser) {
            navigate(URL_NAVIGATE.login)
        } else {
            setNameLogedUser(getLocalStorage(HO_TEN))
        }
    }, [])
    const allowShowSideBar = isWidth768 || showSideBar
    const logoutHandle = () => {
        removeLocalStorage(ACCESS_TOKEN)
        removeLocalStorage(TAI_KHOAN)
        removeLocalStorage(HO_TEN)
        removeLocalStorage(MA_LOAI_NGUOI_DUNG)
        navigate(URL_NAVIGATE.home)
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink to={URL_NAVIGATE.profile}>Cập nhật thông tin</NavLink>
            ),
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
                        (allowShowSideBar && css['--mw-6'])
                    }
                >
                    <div className={'' + (allowShowSideBar && css['--g-0'])}>
                        <NavLink to={URL_NAVIGATE.home}>
                            <img
                                className={allowShowSideBar ? css['--dn'] : ''}
                                src={logo}
                                alt='...'
                            />
                        </NavLink>
                        <p className={allowShowSideBar ? css['--dn'] : ''}>
                            Dashboard
                        </p>
                        <span
                            className={allowShowSideBar ? css['--ma'] : ''}
                            onClick={() => {
                                if (isWidth768) return
                                setShowSideBar((s) => !s)
                            }}
                        >
                            <BarsIcon />
                        </span>
                    </div>
                    <ul>
                        <li className={allowShowSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/admin/quanlikhoahoc'}>
                                Quản lý khóa học
                            </NavLink>
                        </li>
                        <li className={allowShowSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/admin/quanlinguoidung'}>
                                Quản lý người dùng
                            </NavLink>
                        </li>
                        <li className={!allowShowSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/'}>
                                <LearnIcon />
                            </NavLink>
                        </li>
                        <li className={!allowShowSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/admin/quanlinguoidung'}>
                                <UserFill />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={css['admin-template-container__side-right']}>
                    <div className={css['admin-template-container__top']}>
                        <p>Xin chào: {nameLogedUser}</p>
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
