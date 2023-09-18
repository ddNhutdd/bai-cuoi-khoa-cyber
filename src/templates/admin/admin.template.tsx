import { NavLink, Outlet } from 'react-router-dom'
import css from './admin.template.module.scss'
import logo from '../../assets/imgs/logonobg.png'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useState } from 'react'
import { BarsIcon, LearnIcon, UserFill } from '../../assets/icons/icons'
const items: MenuProps['items'] = [
    {
        key: '1',
        label: <a>Cập nhật thông tin</a>,
    },
    {
        key: '2',
        label: <a>Đăng xuất</a>,
    },
]
export default function AdminTemplate() {
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
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
                        <img
                            className={showSideBar ? css['--dn'] : ''}
                            src={logo}
                            alt='...'
                        />
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
                            <NavLink to={'/'}>Quản lý người dùng</NavLink>
                        </li>
                        <li className={!showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/'}>
                                <LearnIcon />
                            </NavLink>
                        </li>
                        <li className={!showSideBar ? css['--dn'] : ''}>
                            <NavLink to={'/'}>
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
