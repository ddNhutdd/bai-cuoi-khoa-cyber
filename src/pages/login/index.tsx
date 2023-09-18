import { useState } from "react"
import css from './login.module.scss'
import UserIcon from "../../assets/icons/user.icon";
import LockIcon from "../../assets/icons/lock.icon";
import iconGG from '../../assets/imgs/icon-gg.png'
import iconFace from '../../assets/imgs/icon-face.avif'
import iconTwitter from '../../assets/imgs/icon-twitter.png'
import ButtonQT from "../../components/button";
import InputForm from "../../components/input";

function Login() {
  const [formLogin, setFormLogin] = useState({
    taiKhoan: '',
    matKhau: ''
  })

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formLogin)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormLogin({
      ...formLogin,
      [name]: value
    })
  }

  return (
    <div className={css['form-container']}>
      <form onSubmit={handleLogin} className={css['login-form']}>
        <div className={css['content']}>
          <h2>Đăng nhập</h2>
        </div>
        <div className={css['input-container']}>
          {/* <input name="taiKhoan" onChange={handleChange} value={formLogin.taiKhoan} className={css['input-tk']} placeholder="Tài khoản" /> */}
          <InputForm name="taiKhoan" onChange={handleChange} value={formLogin.taiKhoan} placeholder="Tài khoản" />
          <div className={css['icon-user']}><UserIcon /></div>
        </div>
        <div className={css['input-container']}>
          <InputForm type="password" name="matKhau" onChange={handleChange} value={formLogin.matKhau} placeholder="Mật khẩu" />
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
