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

export const layKhoaHocTheoDanhMuc = async (maDanhMuc:string, maNhom = 'GP01') => {
    try {
        const resp = await axiosWithoutAuth(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`)
        return resp.data
    } catch (error:any) {
        console.log(error.response.data)
        return error.response.data
    }
}

export const dangKiKhoaHoc = async (maKhoaHoc:string, taiKhoan: string) => {
    try {
        const dataToSend = {
            maKhoaHoc, taiKhoan
        }
        const resp= await axiosWithAuth.post('/QuanLyKhoaHoc/DangKyKhoaHoc', dataToSend)
        return resp.data
    } catch (error:any) {
        console.log(error.response.data)
        return error.response.data
    }
}

export const ghiDanhKhoaHoc = (maKhoaHoc:string, taiKhoan:string) => {
    try {
        const dataToSend = {
            maKhoaHoc, taiKhoan
        }
        const resp = axiosWithAuth({
            method:'post',
            url: '/QuanLyKhoaHoc/GhiDanhKhoaHoc',
            data: dataToSend
        })
        return resp;
    } catch (err:any) {
        console.log(err)
    }
}