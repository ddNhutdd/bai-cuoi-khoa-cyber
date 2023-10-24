export const ACCESS_TOKEN = 'access_token'
export const TAI_KHOAN = 'tai_khoan'
export const HO_TEN = 'ho_ten'
export const MA_LOAI_NGUOI_DUNG = 'ma_loai_nguoi_dung'
export const MA_NHOM = 'ma_nhom'
export const TOKEN_CYBERSOFT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`
///////
export const ITEM_PER_PAGE = 12
export const enum LOAI_NGUOI_DUNG {
    GV = 'GV',
    hv = 'HV'
}
export const enum API_RESPONSE {
    gdtc = "Ghi danh thành công!",
    tb = "Thất bại",
    huyGhiDanh = 'Hủy ghi danh thành công !',
    huyThanhCong = 'Xóa thành công',
    khongTheHuy = 'Khóa học đã ghi danh học viên không thể xóa!',
    themThanhCong = 'Thêm khóa học thành công !'
}
////
export const enum URL_NAVIGATE {
    login = '/login',
    home = '/',
    profile = '/profile',
    register = '/register',
    quanLiNguoiDung = '/admin/quanlinguoidung',
    quanLiKhoaHoc = '/admin/quanlikhoahoc',
    hinhAnh = 'https://elearningnew.cybersoft.edu.vn/hinhanh/'
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
    maKhoaHoc_Min = 'Mã khóa học phải từ 3 ký tự trở lên !',
    maKhoaHoc_Max = 'Mã khóa học phải nhỏ hơn 20 ký tự !',
    maKhoaHoc_Required = 'Mã khóa học không được bỏ trống !',
    biDanh_Min = 'Bí danh phải từ 3 ký tự trở lên !',
    biDanh_Max = 'Bí danh phải nhỏ hơn 50 ký tự !',
    biDanh_Required = 'Bí danh không được bỏ trống !',
    tenKhoaHoc_Min = 'Tên khóa học phải từ 3 ký tự trở lên !',
    tenKhoaHoc_Max = 'Tên khóa học phải nhỏ hơn 30 ký tự !',
    tenKhoaHoc_Required = 'Tên khóa học không được bỏ trống !',
    moTa_Min = 'Mô tả phải từ 1 ký tự trở lên !',
    moTa_Max = 'Mô tả phải nhỏ hơn 200 ký tự !',
    moTa_Required = 'Mô tả không được bỏ trống !',
    hinhAnh_hl = 'Hình ảnh không hợp lệ',
    hinhAnh_Min = 'Hình ảnh phải từ 3 ký tự trở lên !',
    hinhAnh_Max = 'Hình ảnh phải nhỏ hơn 100 ký tự !',
    hinhAnh_Required = 'Hình ảnh không được bỏ trống !',
    ngayTao_Min = 'Ngày tạo phải từ 3 ký tự trở lên !',
    ngayTao_Max = 'Ngày tạo phải nhỏ hơn 10 ký tự !',
    ngayTao_Required = 'Ngày tạo không được bỏ trống !',
    maDanhMucKhoaHoc_Min = 'Mã danh mục phải từ 3 ký tự trở lên !',
    maDanhMucKhoaHoc_Max = 'Mã danh mục phải nhỏ hơn 10 ký tự !',
    maDanhMucKhoaHoc_Required = 'Mã danh mục không được bỏ trống !',
    tkNguoiTao_Min = 'Tài khoản người tạo phải từ 3 ký tự trở lên !',
    tkNguoiTao_Max = 'Tài khoản người tạo phải nhỏ hơn 10 ký tự !',
    tkNguoiTao_Required = 'Tài khoản người tạo không được bỏ trống !',
    luotXem_Min = 'Lượt xem phải từ 0 trở lên !',
    luotXem_Max = 'Lượt xem phải nhỏ hơn 5000 !',
    luotXem_Required = 'Lượt xem không được bỏ trống !',
    danhGia_Min = 'Đánh giá phải từ 0 trở lên !',
    danhGia_Max = 'Đánh giá phải nhỏ hơn 5000 !',
    danhGia_Required = 'Đánh giá không được bỏ trống !',

}
export const enum COMMON_MESSAGE {
    thanhCong = 'Thành công',
    thatBai = 'Thất bại',
    nhapVaoTaiKhoanHocTenNguoiDung = 'Nhập vào tên tài khoản hoặc họ tên người dùng',
    dangKiThanhCong = 'Đăng ký thành công !',
    dangKiThatBai = 'Đăng ký không thành công. Có lỗi xảy ra !',
    xoaThanhCong = 'Xóa thành công !',
    capNhatSuccess = 'Cập nhật thành công',
    capNhatFail = 'Cập nhật thất bại'
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
    stt = "STT",
    maNhom = "maNhom",
    maDanhMuc = "maDanhMuc"
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