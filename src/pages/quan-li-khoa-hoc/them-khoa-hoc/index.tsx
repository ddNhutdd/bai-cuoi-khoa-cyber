import { useFormik } from 'formik'
import InputForm from '../../../components/input'
import { ALERT_CONFIG, API_RESPONSE, VALIDATITON } from '../../../constants'
import css from './add.module.scss'
import * as Y from 'yup'
import ButtonQT from '../../../components/button'
import { themKhoaHoc } from '../../../services/khoa-hoc.service'
import { toast } from 'react-toastify'
import { isPage } from '..'

const registerSchema = Y.object({
  
  maKhoaHoc: Y.string()
    .min(3, VALIDATITON.maKhoaHoc_Min)
    .max(10, VALIDATITON.maKhoaHoc_Max)
    .required(VALIDATITON.maKhoaHoc_Required),
  biDanh: Y.string()
    .min(6, VALIDATITON.biDanh_Min)
    .max(20, VALIDATITON.biDanh_Max)
    .required(VALIDATITON.biDanh_Required),
  tenKhoaHoc: Y.string()
    .min(6, VALIDATITON.tenKhoaHoc_Min)
    .max(30, VALIDATITON.tenKhoaHoc_Max)
    .required(VALIDATITON.tenKhoaHoc_Required),
  moTa: Y.string()
    .min(1, VALIDATITON.moTa_Min)
    .max(200, VALIDATITON.moTa_Max)
    .required(VALIDATITON.moTa_Required),
  luotXem: Y.number()
    .min(1, VALIDATITON.luotXem_Min)
    .max(5000, VALIDATITON.luotXem_Max)
    .required(VALIDATITON.luotXem_Required),
  danhGia: Y.number()
    .min(1, VALIDATITON.danhGia_Min)
    .max(5000, VALIDATITON.danhGia_Max)
    .required(VALIDATITON.danhGia_Required),
  maNhom: Y.string()
    .min(3, VALIDATITON.maNhom_Min)
    .max(30, VALIDATITON.maNhom_Max)
    .required(VALIDATITON.maNhom_Required),
  maDanhMucKhoaHoc: Y.string()
    .min(6, VALIDATITON.maDanhMucKhoaHoc_Min)
    .max(20, VALIDATITON.maDanhMucKhoaHoc_Max)
    .required(VALIDATITON.maDanhMucKhoaHoc_Required),
  taiKhoanNguoiTao: Y.string()
    .min(6, VALIDATITON.tkNguoiTao_Min)
    .max(20, VALIDATITON.tkNguoiTao_Max)
    .required(VALIDATITON.tkNguoiTao_Required),
})


function ThemKhoaHoc(props: any) {
  const {setPage} = props
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const formattedDay = currentDay < 10 ? `0${currentDay}` : currentDay.toString();
  const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();
  const formattedYear = currentYear.toString();
  const currentDateStr = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: '',
      biDanh: '',
      tenKhoaHoc: '',
      moTa: '',
      luotXem: 0,
      danhGia: 0,
      hinhAnh: '',
      maNhom: '',
      ngayTao: '',
      maDanhMucKhoaHoc: '',
      taiKhoanNguoiTao: ''

    },
    validationSchema: registerSchema,

    onSubmit: async (value) => {
      const data = {
        maKhoaHoc: value.maKhoaHoc,
        biDanh: value.biDanh,
        tenKhoaHoc: value.tenKhoaHoc,
        moTa: value.moTa,
        luotXem: value.luotXem,
        danhGia: value.danhGia,
        hinhAnh: value.hinhAnh,
        maNhom: value.maNhom,
        ngayTao: value.ngayTao,
        maDanhMucKhoaHoc: value.maDanhMucKhoaHoc,
        taiKhoanNguoiTao: value.taiKhoanNguoiTao
    }

      try {
        const response = await themKhoaHoc(data);
        if(response.statusText === 'OK'){
          toast.success(API_RESPONSE.themThanhCong, ALERT_CONFIG)
        }
        else{
          toast.error(response, ALERT_CONFIG)
        }
        
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <div>
      <div className={css['tro-lai']} onClick={() => setPage(isPage.list)}>{'<< '}Trở lại danh sách</div>
      <p className={css['add-kh']}>Thêm khóa học</p>
      <form onSubmit={formik.handleSubmit} className={css['profile-form']}>
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
              <p className={css['p-titleNum']}>Lượt xem</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('luotXem')}
                placeholder="Lượt xem" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-titleNum']}>Đánh giá</p>
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
                {...formik.getFieldProps('maNhom')}
                placeholder="Mã nhóm" />
            </div>
          </div>
          <div className={css['input-row']}>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Ngày tạo</p>
              <InputForm
                formik={formik}
                {...formik.getFieldProps('ngayTao')}
                value={currentDateStr}
                placeholder="Ngày tạo" />
            </div>
            <div className={css['input-ele']}>
              <p className={css['p-title']}>Mã danh mục khóa học</p>
              <InputForm
                formik={formik}
                dropdown2
                dropdownValue2={formik.values.maDanhMucKhoaHoc}
                setFieldValue={formik.setFieldValue}
                {...formik.getFieldProps('maDanhMucKhoaHoc')}
                placeholder="Mã danh mục khóa học" />
            </div>
          </div>
          <div className={css['input-img']}>
            <p className={css['p-title']}>Hình ảnh</p>
            <InputForm
              formik={formik}
              {...formik.getFieldProps('hinhAnh')}
              value="https://elearningnew.cybersoft.edu.vn/hinhanh/"
              placeholder="Hình ảnh" />
          </div>
        </div>
        <div className={css['button-addKh']}><ButtonQT title='Thêm khóa học' type = 'submit'/></div>
      </form>
    </div>
  )
}

export default ThemKhoaHoc
