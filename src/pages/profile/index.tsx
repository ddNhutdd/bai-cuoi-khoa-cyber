import ButtonQT from '../../components/button'
import css from './profile.module.scss'
import InputForm from '../../components/input'
import NoteIcon from '../../assets/icons/note.icon'
import ListCard from '../../components/list-card/list-card'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Y from 'yup'
import { getProfile, updateProfile } from '../../services/user.service'
import { useEffect } from 'react'
import { ACCESS_TOKEN } from '../../constants'
import { getLocalStorage } from '../../utils'
import { URL_NAVIGATE } from "../../constants"

const registerSchema = Y.object({
  taiKhoan: Y.string()
    .min(6, 'Tài khoản phải từ 6 ký tự trở lên !')
    .max(20, 'Tài khoản phải nhỏ hơn 20 ký tự !')
    .required('Tài khoản không được bỏ trống !'),
  matKhau: Y.string()
    .min(6, 'Mật khẩu phải từ 6 ký tự trở lên !')
    .max(20, 'Mật khẩu phải nhỏ hơn 20 ký tự !')
    .required('Mật khẩu không được bỏ trống !'),
  hoTen: Y.string()
    .min(6, 'Họ tên phải từ 6 ký tự trở lên !')
    .max(20, 'Họ tên phải nhỏ hơn 20 ký tự !')
    .required('Họ tên không được bỏ trống !'),
  soDT: Y.string()
    .min(6, 'Số điện thoại phải từ 6 ký tự trở lên !')
    .max(15, 'Số điện thoại phải nhỏ hơn 20 ký tự !')
    .required('Số điện thoại không được bỏ trống !'),
  maNhom: Y.string()
    .min(1, 'Mã nhóm phải từ 1 ký tự trở lên !')
    .max(5, 'Mã nhóm phải nhỏ hơn 6 ký tự !')
    .required('Mã nhóm không được bỏ trống !'),
  email: Y.string()
    .email('Email không hợp lệ !')
    .min(6, 'Email phải từ 6 ký tự trở lên !')
    .max(30, 'Email phải nhỏ hơn 20 ký tự !')
    .required('Email không được bỏ trống !'),
})

function Profile() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDT: '',
      maLoaiNguoiDung: '',
      maNhom: '',
      email: '',
      chiTietKhoaHocGhiDanh: [
        {
          maKhoaHoc: '',
          tenKhoaHoc: '',
          biDanh: '',
          moTa: '',
          luotXem: '',
          ngayTao: '',
          danhGia: '',
          hinhAnh: ''
        }
      ],
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const data = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        hoTen: values.hoTen,
        soDT: values.soDT,
        maLoaiNguoiDung: values.maLoaiNguoiDung,
        maNhom: values.maNhom,
        email: values.email,
        chiTietKhoaHocGhiDanh: values.chiTietKhoaHocGhiDanh
      };
      // Gọi API hoặc thực hiện xử lý dữ liệu data 
      updateProfile(data)
        .then((resp) => {
          if (resp) {
            alert('Cập nhật thành công');
          } else {
            console.log('Cập nhật thất bại');
            alert('Cập nhật thất bại');
          }
        })
        .catch((err) => {
          console.log(err)
          alert('Cap nhat that bai')
        })

    },
  })



  useEffect(() => {
    (async () => {
      const token = getLocalStorage(ACCESS_TOKEN);
      if (!token) {
        navigate(URL_NAVIGATE.login);
      }
      const data = await getProfile();
      const { taiKhoan, email, matKhau, hoTen, maLoaiNguoiDung, soDT, maNhom, chiTietKhoaHocGhiDanh } = data?.data ?? {};
      formik.setFieldValue('taiKhoan', taiKhoan);
      formik.setFieldValue('email', email);
      formik.setFieldValue('matKhau', matKhau);
      formik.setFieldValue('hoTen', hoTen);
      formik.setFieldValue('maLoaiNguoiDung', maLoaiNguoiDung);
      formik.setFieldValue('soDT', soDT);
      formik.setFieldValue('maNhom', maNhom);
      formik.setFieldValue('chiTietKhoaHocGhiDanh', chiTietKhoaHocGhiDanh);
    })();
  }, []);



  return (
    <div className={css['form-container']}>
      <form onSubmit={formik.handleSubmit} className={css['profile-form']}>
        <div className={css['h2-profile']}>
          <h2>Trang cá nhân</h2>
          <span><NoteIcon /></span>
        </div>
        <div className={css['flex-container']}>

          {/* Phần 40% là hình ảnh */}
          <div className={css['image-container']}>
            <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE6.svg" />
          </div>

          {/* Phần 60% là 6 InputForm */}
          <div className={css['input-forms-container']}>
            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Tài khoản</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('taiKhoan')}
                  placeholder="Tài khoản"
                  disabled={true} />
              </div>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Mật khẩu</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('matKhau')}
                  type='password'
                  showEye={true}
                  placeholder="Mật khẩu" />
              </div>
            </div>

            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Họ tên</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('hoTen')} placeholder="Họ tên" />
              </div>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Số điện thoại</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('soDT')} placeholder="Số điện thoại" />
              </div>
            </div>

            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Mã nhóm</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('maNhom')}
                  disabled={true}
                  placeholder="Mã nhóm" />
              </div>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Email</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('email')} placeholder="Email" />
              </div>
            </div>

            <div className={css['input-row']}>
              <div className={css['input-ele']}>
                <p className={css['p-title']}>Loại người dùng</p>
                <InputForm
                  formik={formik}
                  {...formik.getFieldProps('maLoaiNguoiDung')}
                  disabled={true}
                  placeholder="Loại người dùng" />
              </div>
              <div className={css['button-profile']}>
                <ButtonQT title='Cập nhật' />
              </div>
            </div>
        </div>
        </div>
        <div className={css['h2-profile']}>
          <h2>Khóa học đã đăng ký</h2>
          <span><NoteIcon /></span>
        </div>
        <div>
          <ListCard list={formik.values.chiTietKhoaHocGhiDanh} />
        </div>
        
      </form>
    </div>
  )
}

export default Profile
