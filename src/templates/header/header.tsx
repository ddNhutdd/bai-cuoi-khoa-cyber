
import css from './header.module.scss'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Input } from 'antd'
import logo from '../../assets/imgs/cyberlogo-white.png'
import { UnorderedListOutlined } from '@ant-design/icons'
const { Search } = Input
export default function Header() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.antgroup.com'
                >
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.aliyun.com'
                >
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.luohanacademy.com'
                >
                    3rd menu item
                </a>
            ),
        },
    ]
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
