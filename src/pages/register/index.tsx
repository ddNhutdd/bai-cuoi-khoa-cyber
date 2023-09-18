import { useFormik } from "formik"
import css from './register.module.scss'
import imgMuiten from '../../assets/imgs/mui-ten.png'
import UserIcon from "../../assets/icons/user.icon"
import { Link } from "react-router-dom"
import NoteIcon from "../../assets/icons/note.icon"

function Register() {
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            soDT: '',
            maNhom: '',
            email: ''
        },

        validate: (value) => {
            const err: Partial<typeof value> = {}

            if (!value.taiKhoan) {
                err.taiKhoan = 'err tai khoan'
            }
            return err
        },

        onSubmit: (value) => {
            console.log({ value })
        }
    })
    return (
        <div className={css['form-container']}>
            <div className={css['img-register']}>
                <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE6.svg" />
                <img className={css['img-cyber']} src={imgMuiten}  />
                <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE21.svg" />
            </div>

            <form onSubmit={formik.handleSubmit} className={css['register-form']}>
                <h2 className={css['h2-register']}>Đăng kí <NoteIcon/></h2>
                <div className={css['input-container']}>
                    <input className={css['input-register']}
                        // value={formik.values.taiKhoan}
                        // name="taiKhoan"
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}

                        {...formik.getFieldProps('taiKhoan')}

                        placeholder="Tài khoản" />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                        <p className={css['p-errors']}>{formik.errors.taiKhoan}</p>
                    )}
                    
                    <input className={css['input-register']}
                        value={formik.values.matKhau}
                        name="matKhau"
                        onChange={formik.handleChange}
                        placeholder="Mật khẩu" />
                    
                    <input className={css['input-register']}
                        value={formik.values.hoTen}
                        name="hoTen"
                        onChange={formik.handleChange}
                        placeholder="Họ tên" />
                    
                    <input className={css['input-register']}
                        value={formik.values.soDT}
                        onChange={formik.handleChange}
                        name="soDT"
                        placeholder="Số điện thoại" />
                    
                    <input className={css['input-register']}
                        value={formik.values.maNhom}
                        name="maNhom"
                        onChange={formik.handleChange}
                        placeholder="Mã nhóm" />
                   
                    <input className={css['input-register']}
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        placeholder="Email" />
                   
                    <Link to='/profile'><button className={css['button-register']} type="submit">Đăng kí</button></Link>
                </div>
            </form>

        </div>

    )
}

export default Register
