import css from './header.module.scss'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Input } from 'antd'
import logo from '../../assets/imgs/cyberlogo-white.png'
import { UnorderedListOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { layDanhMucKhoaHoc } from '../../services/khoa-hoc.service'
const { Search } = Input
export default function Header() {
    const [listDanhMucKhoaHoc, setListDanhMucKhoaHoc] = useState<any>([])
    useEffect(() => {
        fetchMenuItems()
    }, [])
    const items: MenuProps['items'] = [...listDanhMucKhoaHoc]
    const fetchMenuItems = async () => {
        const menuItems = await layDanhMucKhoaHoc()
        if(typeof menuItems === 'string') { // có lỗi xảy ra thì giá trị trả về là string không phải array
            return;
        }
        setListDanhMucKhoaHoc(
            menuItems.map((item: any) => ({
                label: (
                    <NavLink to={`/DanhMucKhoaHoc?maDanhMuc=${item.maDanhMuc}&maNhom=GP01`}>
                        {item.tenDanhMuc}
                    </NavLink>
                ),
            })),
        )
    }
    return (
        <div className={css['header']}>
            <div className={css['header__container']}>
                <div className={css['header__container__logo']}>
                    <img src={logo} alt='...' />
                </div>
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
                    // onSearch={() => {}}
                    enterButton
                />
                <div className={css['header__action']}>
                    <Button type='primary'>Đăng kí</Button>
                    <Button type='primary'>Đăng nhập</Button>
                </div>
            </div>
        </div>
    )
}
