import { NavLink, Outlet } from 'react-router-dom'
import css from './admin.template.module.scss'
import logo from '../../assets/imgs/logonobg.png'
import {useState} from 'react'
import { BarsIcon, LearnIcon, UserFill } from '../../assets/icons/icons'

export default function AdminTemplate() {
    const [showSideBar, setShowSideBar] = useState<boolean>(false);
    return (
        <>
            <div className={css['admin-template-container']}>
                <div className={css['admin-template-container__side-left'] + ' ' + (showSideBar && css['--mw-4']) }>
                    <div>
                        <img  className={(showSideBar ? css['--dn'] : '')} src={logo} alt='...' />
                        <p className={(showSideBar ? css['--dn'] : '')}>Dashboard</p>
                        <span className={(showSideBar ? css['--ma'] : '')} onClick={() => {
                            setShowSideBar(s => !s)
                        }}>
                            <BarsIcon />
                        </span>
                    </div>
                    <ul>
                        <li className={(showSideBar ? css['--dn'] : '')}>
                            <NavLink to={'/'}>Quản lý khóa học</NavLink>
                        </li>
                        <li className={(showSideBar ? css['--dn'] : '')}>
                            <NavLink to={'/'}>Quản lý người dùng</NavLink>
                        </li>

                        <li className={(!showSideBar ? css['--dn'] : '')}>
                            <NavLink to={'/'}><LearnIcon /></NavLink>
                        </li>
                        <li className={(!showSideBar ? css['--dn'] : '')}>
                            <NavLink to={'/'}><UserFill /></NavLink>
                        </li>
                        
                    </ul>
                </div>
                <div className={css['admin-template-container__side-right']}>
                    <div className={css['admin-template-container__top']}>
                        tpo
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
