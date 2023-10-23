import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../config-store'
const initialState = {
    selectedUserForUpdate: {
        email: "",
        hoTen: "",
        maLoaiNguoiDung: "GV",
        soDienThoai: "",
        taiKhoan: ""
    },
    loggedUserInfo: {
        name: ""
    }
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectUserForUpdate: (state, action) => {
            const { email, hoTen, maLoaiNguoiDung, soDienThoai, taiKhoan } = action.payload
            state.selectedUserForUpdate.email = email
            state.selectedUserForUpdate.hoTen = hoTen
            state.selectedUserForUpdate.maLoaiNguoiDung = maLoaiNguoiDung
            state.selectedUserForUpdate.soDienThoai = soDienThoai
            state.selectedUserForUpdate.taiKhoan = taiKhoan
        },
        setLoggedUserInfo: (state, action) => {
            const name = action.payload
            state.loggedUserInfo.name = name
        }
    }
})
export default userSlice.reducer
export const { selectUserForUpdate, setLoggedUserInfo } = userSlice.actions
export const userForUpdate = (state: RootState) => state.user.selectedUserForUpdate
export const loggedUserInfo = (state: RootState) => state.user.loggedUserInfo
