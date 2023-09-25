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