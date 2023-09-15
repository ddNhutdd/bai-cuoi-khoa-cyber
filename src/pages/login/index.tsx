import { useState } from "react"
import css from './login.module.scss'
import { Button } from "antd";

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
    <div className={css['form-login']}>
      <form onSubmit={handleLogin} className={css['login-form']}>

        <div className={css['content']}>
          <h2>Đăng nhập</h2>
        </div>
        <div className={css['input-container']}>
          <input name="taiKhoan" onChange={handleChange} value={formLogin.taiKhoan} className={css['input-tk']} placeholder="Tài khoản" />
        </div>
        <div className={css['input-container']}>
          <input name="matKhau" onChange={handleChange} value={formLogin.matKhau} className={css['input-mk']} placeholder="Mật khẩu" />
        </div>

        <button type="submit" className={css['button-login']}>
          Login
        </button>

      </form>
    </div>
  )
}

export default Login
