
import css from './login.module.scss'
import UserIcon from "../../assets/icons/user.icon";
import LockIcon from "../../assets/icons/lock.icon";
import iconGG from '../../assets/imgs/icon-gg.png'
import iconFace from '../../assets/imgs/icon-face.avif'
import iconTwitter from '../../assets/imgs/icon-twitter.png'
import ButtonQT from "../../components/button";
import InputForm from "../../components/input";
import {useFormik } from "formik";
import * as Y from 'yup'
import { userLogin } from "../../services/user.service";
import { setLocalStorage } from '../../utils';
import { ACCESS_TOKEN } from '../../constants';

const registerSchema = Y.object({
  taiKhoan: Y.string()
      .min(6, 'Tài khoản phải từ 6 ký tự trở lên !')
      .max(20, 'Tài khoản phải nhỏ hơn 20 ký tự !')
      .required('Tài khoản không được bỏ trống !'),
  matKhau: Y.string()
      .min(6, 'Mật khẩu phải từ 6 ký tự trở lên !')
      .max(20, 'Mật khẩu phải nhỏ hơn 20 ký tự !')
      .required('Mật khẩu không được bỏ trống !'),
})

function Login() {
  
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
            alert('Đăng nhập thành công !')
            setLocalStorage(ACCESS_TOKEN, resp.content.accessToken);
          })
          .catch((err: any) => console.log(err));
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
            {...formik.getFieldProps('matKhau')} placeholder="Mật khẩu" />
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
