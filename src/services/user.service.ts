import { UserRegister } from "../types";
import { axiosWithAuth, axiosWithoutAuth } from "./config.service";

export const userLogin =async (data: { taiKhoan: string; matKhau: string }) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '',
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
    } catch (err:any) {
        console.log(err)
    }
}