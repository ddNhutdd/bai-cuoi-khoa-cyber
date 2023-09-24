import { MenuProps } from 'antd'
import Dropdown from 'antd/es/dropdown/dropdown'
import { NavLink } from 'react-router-dom';
interface UserDropdownProps {
    dangXuat: () => void;
    userName:string
  }
const UserDropdown: React.FC<UserDropdownProps> = (props) => {
    const  {dangXuat, userName}  = props
    const items: MenuProps['items'] = [
        {
            label: <NavLink to='/profile'>Cập nhật thông tin</NavLink>,
            key: '0',
        },
        {
            label: <a onClick={dangXuat}>Đăng xuất</a>,
            key: '1',
        },
    ]
    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                <span
                    style={{
                        color: 'white',
                        cursor: 'default',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {userName}
                </span>
            </a>
        </Dropdown>
    )
}
export default UserDropdown
