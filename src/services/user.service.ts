import { UserRegister } from "../types/classnames";
import { axiosWithoutAuth } from "./config.service";

export const userLogin =async (data:{email: string; password: string}) => {
    try {
        const resp = await {
            method: 'post',
            url: '',
            data
        }
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const signup = async (data: UserRegister) => {
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