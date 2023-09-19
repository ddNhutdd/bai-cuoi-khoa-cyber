import { MenuProps } from 'antd'
import Dropdown from 'antd/es/dropdown/dropdown'
interface UserDropdownProps {
    dangXuat: () => void;
    userName:string
  }
const UserDropdown: React.FC<UserDropdownProps> = (props) => {
    const  {dangXuat, userName}  = props
    console.log('dsafd ', dangXuat )
    const items: MenuProps['items'] = [
        {
            label: <a href='https://www.antgroup.com'>Cập nhật thông tin</a>,
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
