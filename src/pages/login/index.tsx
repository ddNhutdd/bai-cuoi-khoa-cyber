import css from './login.module.scss'
import UserIcon from "../../assets/icons/user.icon";
import LockIcon from "../../assets/icons/lock.icon";
import iconGG from '../../assets/imgs/icon-gg.png'
import iconFace from '../../assets/imgs/icon-face.avif'
import iconTwitter from '../../assets/imgs/icon-twitter.png'
import ButtonQT from "../../components/button";
import InputForm from "../../components/input";
import { useFormik } from "formik";
import * as Y from 'yup'
import { userLogin } from "../../services/user.service";
import { setLocalStorage } from '../../utils';
import { ACCESS_TOKEN, HO_TEN, MA_LOAI_NGUOI_DUNG, TAI_KHOAN, URL_NAVIGATE, VALIDATITON } from '../../constants';
import { useNavigate } from 'react-router-dom';
import 'animate.css'

const registerSchema = Y.object({
  taiKhoan: Y.string()
    .min(6, VALIDATITON.taikhoan_Min)
    .max(20, VALIDATITON.taikhoan_Max)
    .required( VALIDATITON.taikhoan_Required ),
  matKhau: Y.string()
    .min(6, VALIDATITON.matKhau_Min)
    .max(20, VALIDATITON.matKhau_Max)
    .required( VALIDATITON.matKhau_Required ),
})

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const data = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau
      };
      userLogin(data)
        .then((resp: any) => {
          if(resp){
            console.log(resp)
            setLocalStorage(ACCESS_TOKEN, resp.accessToken);
            setLocalStorage(TAI_KHOAN, resp.taiKhoan)
            setLocalStorage(HO_TEN, resp.hoTen)
            setLocalStorage(MA_LOAI_NGUOI_DUNG, resp.maLoaiNguoiDung)
            alert('Đăng nhập thành công !')
            
            if(resp.maLoaiNguoiDung === 'HV'){
              navigate(URL_NAVIGATE.home)
            }
            else{
              navigate(URL_NAVIGATE.quanlynguoidung)
            }
            
          }
          else{
            alert('Đăng nhập không thành công. Có lỗi xảy ra.');
          }
          
        })
        .catch((err: any) => {
          console.log(err)
          alert('Đăng nhập không thành công. Có lỗi xảy ra.');
        });
    },
  })


  return (
    <div className={css['form-container']}>
      <form onSubmit={formik.handleSubmit} className={css['login-form']}>
        <div className={css['content']}>
          <h2>Đăng nhập</h2>
        </div>
        <div className={css['input-container']}>
          {/* <input name="taiKhoan" onChange={handleChange} value={formLogin.taiKhoan} className={css['input-tk']} placeholder="Tài khoản" /> */}
          <div className={css['input-formik']}>
            <InputForm
              formik={formik}
              {...formik.getFieldProps('taiKhoan')} placeholder="Tài khoản" />
          </div>
          <div className={css['icon-user']}><UserIcon /></div>
        </div>
        <div className={css['input-container']}>
          <div className={css['input-formik']}>
            <InputForm
              formik={formik}
              {...formik.getFieldProps('matKhau')}
              type='password'
              showEye={true}
              placeholder="Mật khẩu" />
          </div>

          <div className={css['icon-lock']}><LockIcon /></div>
        </div>
        <div className={css['remember-forgot']}>
          <div className={css['checkbox-remember']}>
            <input type="checkbox" />
            <span className={css['remember']}>Ghi nhớ</span>
          </div>
          <span className={css['forgot']}>Quên mật khẩu ?</span>
        </div>
        <div className={css['icon-contact']}>
          <img className={css['icon-f']} style={{ width: '80px' }} src={iconFace} />
          <img className={css['icon-twiter']} style={{ width: '70px' }} src={iconTwitter}></img>
          <img className={css['icon-gg']} style={{ width: '50px' }} src={iconGG} />
        </div>

        <ButtonQT title='Đăng nhập' type="submit" />

      </form>
    </div>
  )
}

export default Login
