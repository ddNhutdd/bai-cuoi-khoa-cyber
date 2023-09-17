import { useFormik } from "formik"
import css from './register.module.scss'

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
            {/* <img className={css['img-register']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE6.svg"/> */}
            <form onSubmit={formik.handleSubmit} className={css['register-form']}>

                <div className={css['input-container']}>
                    <input className={css['input-register']}
                        // value={formik.values.taiKhoan}
                        // name="taiKhoan"
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}

                        {...formik.getFieldProps('taiKhoan')}

                        placeholder="Tài khoản" />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                        <p>{formik.errors.taiKhoan}</p>
                    )}
                    <br />
                    <input className={css['input-register']}
                        value={formik.values.matKhau}
                        name="matKhau"
                        onChange={formik.handleChange}
                        placeholder="Mật khẩu" />
                    <br />
                    <input className={css['input-register']}
                        value={formik.values.hoTen}
                        name="hoTen"
                        onChange={formik.handleChange}
                        placeholder="Họ tên" />
                    <br />
                    <input className={css['input-register']}
                        value={formik.values.soDT}
                        onChange={formik.handleChange}
                        name="soDT"
                        placeholder="Số điện thoại" />
                    <br />
                    <input className={css['input-register']}
                        value={formik.values.maNhom}
                        name="maNhom"
                        onChange={formik.handleChange}
                        placeholder="Mã nhóm" />
                    <br />
                    <input className={css['input-register']}
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        placeholder="Email" />
                    <br />
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>

    )
}

export default Register
