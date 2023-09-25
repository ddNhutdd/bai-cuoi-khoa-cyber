import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../config-store'
const initialState = {
    selectedUserForUpdate: {
        email: "",
        hoTen: "",
        maLoaiNguoiDung: "GV",
        soDienThoai: "",
        taiKhoan: ""
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
        }
    }
})
export default userSlice.reducer
export const { selectUserForUpdate } = userSlice.actions
export const userForUpdate = (state: RootState) => state.user.selectedUserForUpdate
