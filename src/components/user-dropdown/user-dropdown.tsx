import { MenuProps } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Dropdown from 'antd/es/dropdown/dropdown'
import { NavLink } from 'react-router-dom'
import { getLocalStorage } from '../../utils'
import {
    LOAI_NGUOI_DUNG,
    MA_LOAI_NGUOI_DUNG,
    URL_NAVIGATE,
} from '../../constants'
import { loggedUserInfo } from '../../redux/slices/user.slice'
interface UserDropdownProps {
    dangXuat: () => void
    userName: string
}
const UserDropdown: React.FC<UserDropdownProps> = (props) => {
    const { dangXuat, userName } = props
    const typeUserChangeFromProfile = useSelector(loggedUserInfo).type
    useEffect(() => {
        items = renderUserDropdownData()
    }, [typeUserChangeFromProfile])
    const renderUserDropdownData = () => {
        return getLocalStorage(MA_LOAI_NGUOI_DUNG) != LOAI_NGUOI_DUNG.GV
            ? [
                  {
                      label: (
                          <NavLink to={URL_NAVIGATE.profile}>
                              Cập nhật thông tin
                          </NavLink>
                      ),
                      key: '0',
                  },
                  {
                      label: <span onClick={dangXuat}>Đăng xuất</span>,
                      key: '1',
                  },
              ]
            : [
                  {
                      label: (
                          <NavLink to={URL_NAVIGATE.profile}>
                              Cập nhật thông tin
                          </NavLink>
                      ),
                      key: '0',
                  },
                  {
                      label: (
                          <NavLink to={URL_NAVIGATE.quanLiNguoiDung}>
                              Quản lí
                          </NavLink>
                      ),
                      key: '2',
                  },
                  {
                      label: <span onClick={dangXuat}>Đăng xuất</span>,
                      key: '1',
                  },
              ]
    }
    let items: MenuProps['items'] = renderUserDropdownData()
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
