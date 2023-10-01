import { useFormik } from 'formik'
import InputForm from '../../../components/input'
import { VALIDATITON } from '../../../constants'
import css from './add.module.scss'
import * as Y from 'yup'

const registerSchema = Y.object({
  taiKhoan: Y.string()
    .min(6, VALIDATITON.taikhoan_Min)
    .max(20, VALIDATITON.taikhoan_Max)
    .required(VALIDATITON.taikhoan_Required),
  matKhau: Y.string()
    .min(6, VALIDATITON.matKhau_Min)
    .max(20, VALIDATITON.matKhau_Max)
    .required(VALIDATITON.matKhau_Required),
  hoTen: Y.string()
    .min(6, VALIDATITON.hoTen_Min)
    .max(20, VALIDATITON.hoTen_Max)
    .required(VALIDATITON.hoTen_Required),
  soDT: Y.string()
    .min(6, VALIDATITON.soDT_Min)
    .max(15, VALIDATITON.soDT_Max)
    .required(VALIDATITON.soDT_Required),
  maNhom: Y.string()
    .min(1, VALIDATITON.maNhom_Min)
    .max(5, VALIDATITON.maNhom_Max)
    .required(VALIDATITON.maNhom_Required),
  email: Y.string()
    .email(VALIDATITON.email_hl)
    .min(6, VALIDATITON.email_Min)
    .max(30, VALIDATITON.email_Max)
    .required(VALIDATITON.email_Required),
})

function ThemKhoaHoc() {
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: '',
      biDanh: '',
      tenKhoaHoc: '',
      moTa: '',
      luotXem: Y.number,
      danhGia: Y.number,
      hinhAnh: '',
      maNhom: '',
      ngayTao: '',
      maDanhMucKhoaHoc: '',
      taiKhoanNguoiTao: ''

    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {




    },
  })
  return (
    <div>
      <p className={css['add-kh']}>Thêm khóa học</p>
      <form className={css['profile-form']}>
        <div className={css['input-forms-container']}>
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Mã khóa học</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('maKhoaHoc')}
                placeholder="Mã khóa học"
              />
            </div>

            <div className={css['input-ele']}>
              <p className={css['p-title']}>Bí danh</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('biDanh')}
                showEye={true}
                placeholder="Bí danh"
              />
            </div>
          </div>
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Tên khóa học</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('tenKhoaHoc')}
                placeholder="Tên khóa học" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Mô tả</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('moTa')}
                placeholder="Mô tả" />
            </div>
          </div>
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Lượt xem</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('luotXem')}
                placeholder="Lượt xem" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Đánh giá</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('danhGia')}
                placeholder="Đánh giá" />
            </div>
          </div>                      
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Tài khoản người tạo</p>
                <InputForm
                formik={formik}
                {...formik.getFieldProps('taiKhoanNguoiTao')} 
                placeholder="Tài khoản người tạo" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Mã nhóm</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('maNhom')} placeholder="Mã nhóm" />
            </div>
          </div>
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Ngày tạo</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('ngayTao')} placeholder="Ngày tạo" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Danh mục khóa học</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('maDanhMucKhoaHoc')} placeholder="Danh mục khóa học" />
            </div>
          </div>
          <div>
            <p className={css['p-title']}>Hình ảnh</p>
            <InputForm
              formik={formik}
              {...formik.getFieldProps('maDanhMucKhoaHoc')} placeholder="Hình ảnh" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ThemKhoaHoc
