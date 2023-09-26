export const ACCESS_TOKEN = 'access_token'
export const TAI_KHOAN = 'tai_khoan'
export const HO_TEN = 'ho_ten'
export const MA_LOAI_NGUOI_DUNG = 'ma_loai_nguoi_dung'
export const TOKEN_CYBERSOFT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`
///////
export const ITEM_PER_PAGE = 12
export const enum API_RESPONSE {
    gdtc = "Ghi danh thành công!",
    tb = "Thất bại",
}
////
export const enum URL_NAVIGATE {
    login = '/login',
    home = '/',
    profile = '/profile',
    quanlynguoidung = '/admin/quanlinguoidung'
}
export const enum API_STATUS {
    pending = 'pending',
    fetching = 'fetching',
    fetchingSuccess = 'fetchingSuccess',
    fetchingError = 'fetchingError'
}
export const enum VALIDATITON{
    taikhoan_Min = 'Tài khoản phải từ 6 ký tự trở lên !',
    taikhoan_Max = 'Tài khoản phải nhỏ hơn 20 ký tự !',
    taikhoan_Required = 'Tài khoản không được bỏ trống !',
    matKhau_Min = 'Mật khẩu phải từ 6 ký tự trở lên !',
    matKhau_Max = 'Mật khẩu phải nhỏ hơn 20 ký tự !',
    matKhau_Required = 'Mật khẩu không được bỏ trống !',
    hoTen_Min = 'Họ tên phải từ 6 ký tự trở lên !',
    hoTen_Max = 'Họ tên phải nhỏ hơn 20 ký tự !',
    hoTen_Required = 'Họ tên không được bỏ trống !',
    soDT_Min = 'Số điện thoại phải từ 6 ký tự trở lên !',
    soDT_Max = 'Số điện thoại phải nhỏ hơn 20 ký tự !',
    soDT_Required = 'Số điện thoại không được bỏ trống !',
    maNhom_Min = 'Mã nhóm phải từ 1 ký tự trở lên !',
    maNhom_Max = 'Mã nhóm phải nhỏ hơn 6 ký tự !',
    maNhom_Required = 'Mã nhóm không được bỏ trống !',
    email_hl = 'Email không hợp lệ !',
    email_Min = 'Email phải từ 6 ký tự trở lên !',
    email_Max = 'Email phải nhỏ hơn 30 ký tự !',
    email_Required = 'Email không được bỏ trống !',

}
export const enum COMMON_MESSAGE {
    thanhCong = 'Thành công',
    thatBai = 'Thất bại',
}
/////
export const enum FIELD_NAME_WIDTH_SPACE {
    taiKhoan = 'Tài khoản',
    matKhau = 'Mật khẩu',
    hoTen = 'Họ tên',
    email = 'Email',
    soDienThoai = 'Số điện thoại',
    loaiNguoiDung = 'Loại người dùng',
    tenKhoaHoc = 'Tên khoá học',
    xuLi = 'Xử lí',

}

export const enum FIELD_NAME {
    taiKhoan = 'taiKhoan',
    matKhau = 'matKhau',
    hoTen = 'hoTen',
    email = 'email',
    soDienThoai = 'soDienThoai',
    loaiNguoiDung = 'loaiNguoiDung',
    tenKhoaHoc = 'tenKhoaHoc',
    stt = "STT"
}

//
export const enum ERROR_MESSAGE {
    taiKhoanEmpty = 'Tài khoản không được bỏ trống',
    emailEmpty = 'Email không được bỏ trống',
    emailFormat = 'Email không đúng định dạng',
    matKhauEmpty = 'Mật khẩu không được bỏ trống',
    matKhauTooShort = 'Mật khẩu tối thiểu là 6 kí tự',
    matKhauTooLong = 'Mật khẩu phải nhỏ hơn 20 kí tự',
    soDienThoaiEmpty = 'Số điện thoại không được bỏ trống',
    soDienThoaiFormat = 'Số điện thoại không đúng định dạng',
    hoTenEmpty = 'Họ tên không được bỏ trống',
}

export const ALERT_CONFIG: any = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
}