import { axiosWithAuth, axiosWithoutAuth } from './config.service'
export const layDanhMucKhoaHoc = async () => {
    try {
        const resp = await axiosWithoutAuth('/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
        return resp.data
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const timKiemKhoaHoc = async (tenKhoaHoc: string, page: number, pageSize: number, maNhom = 'GP01') => {
    try {
        const resp = await axiosWithoutAuth(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${tenKhoaHoc}&page=${page}&pageSize=${pageSize}&MaNhom=${maNhom}`)
        return resp.data
    }
    catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const layThongTinKhoaHoc = async (maKhoaHoc = 'LTC_GP01') => {
    try {
        const resp = await axiosWithoutAuth(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
        return resp.data
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const layKhoaHocTheoDanhMuc = async (maDanhMuc: string, maNhom = 'GP01') => {
    try {
        const resp = await axiosWithoutAuth(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`)
        return resp.data
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const dangKiKhoaHoc = async (maKhoaHoc: string, taiKhoan: string) => {
    try {
        const dataToSend = {
            maKhoaHoc, taiKhoan
        }
        const resp = await axiosWithAuth.post('/QuanLyKhoaHoc/DangKyKhoaHoc', dataToSend)
        return resp.data
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const ghiDanhKhoaHoc = (maKhoaHoc: string, taiKhoan: string) => {
    try {
        const dataToSend = {
            maKhoaHoc, taiKhoan
        }
        const resp = axiosWithAuth({
            method: 'post',
            url: '/QuanLyKhoaHoc/GhiDanhKhoaHoc',
            data: dataToSend
        })
        return resp;
    } catch (err: any) {
        console.log(err)
    }
}
export const huyGhiDanh = async (maKhoaHoc: string, taiKhoan: string) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyKhoaHoc/HuyGhiDanh',
            data: {
                maKhoaHoc, taiKhoan
            }
        })
        return resp
    } catch (err: any) {
        console.log('err',err)
    }
}
export const themKhoaHoc = async (data: any) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyKhoaHoc/ThemKhoaHoc',
            data,
        })
        return resp
    } catch (err: any) {
        console.log('err',err)
        return err.response.data
    }
}
export const xoaKhoaHoc = async (maKhoaHoc: string) =>{
    try {
        const resp = await axiosWithAuth({
            method: 'delete',
            url: `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,    
            data: {
                maKhoaHoc
            }
        })
        return resp
    } catch (error) {
        console.log(error)
    }
}
export const layDanhSachKhoaHoc = async (maNhom: string) => {
    try {
        const resp = await axiosWithoutAuth(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`)
        return resp.data
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
}
export const layDanhSachChoXetDuyet = async (maKhoaHoc: string) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
            data: {
                maKhoaHoc
            }
        })
        return resp
    } catch (err: any) {
        console.log('err',err)
    }
   
}
export const layDanhSachHocVienKhoaHoc = async (maKhoaHoc: string) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
            data: {
                maKhoaHoc
            }
        })
        return resp
    } catch (err: any) {
        console.log('err',err)
    }
   
}
export const layDanhSachChuaGhiDanh = async (maKhoaHoc: string) => {
    try {
        const resp = await axiosWithAuth({
            method: 'post',
            url: '/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh',
            data: {
                maKhoaHoc
            }
        })
        return resp
    } catch (err: any) {
        console.log('err',err)
    }
   
}