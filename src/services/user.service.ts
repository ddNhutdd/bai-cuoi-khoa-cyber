import { UserProfile, UserRegister } from "../types";
import { axiosWithAuth, axiosWithoutAuth } from "./config.service";
export const userLogin = async (data: { taiKhoan: string; matKhau: string }) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyNguoiDung/DangNhap',
            data
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const register = async (data: UserRegister) => {
    try {
        const resp = await axiosWithoutAuth({
            method: "post",
            url: "/QuanLyNguoiDung/DangKy",
            data,
        });
        return resp.data;
    } catch (err: any) {
        console.log(err)
    }
}
export const getListUserPaging = (tuKhoa = '', page = 1, pageSize = 10, maNhom = 'GP01') => {
    try {
        const resp = axiosWithoutAuth({
            method: 'get',
            url: (`/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=${maNhom}&page=${page}&pageSize=${pageSize}` + (tuKhoa && `&tuKhoa=${tuKhoa}`)),
        })
        return resp
    }
    catch (err: any) {
        console.log(err)
    }
}
export const getProfile = async () => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyNguoiDung/ThongTinNguoiDung'
        })
        return resp;
    } catch (err) {
        console.log(err)
    }
}
export const updateProfile = async (data: UserProfile) => {
    try {
        const resp = await axiosWithAuth({
            method: 'put',
            url: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            data
        })
        console.log('service: ', resp)
        return resp;
    } catch (err) {
        console.log(err)
    }
}