import { useFormik } from "formik"
import css from './register.module.scss'
import imgMuiten from '../../assets/imgs/mui-ten.png'
import { Link } from "react-router-dom"
import NoteIcon from "../../assets/icons/note.icon"
import ButtonQT from "../../components/button"
import InputForm from "../../components/input"
import * as Y from 'yup'

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
    .max(2, 'Mã nhóm phải nhỏ hơn 2 ký tự !')
    .required('Mã nhóm không được bỏ trống !'),
    email: Y.string()
    .email('Email không hợp lệ !')
    .min(6, 'Email phải từ 6 ký tự trở lên !')
    .max(30, 'Email phải nhỏ hơn 20 ký tự !')
    .required('Email không được bỏ trống !'),
})

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

        validationSchema: registerSchema,

        onSubmit: (value) => {
            console.log({ value })
        }
    })
    return (
        <div className={css['form-container']}>
            <div className={css['img-register']}>
                <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE6.svg" />
                <img className={css['img-cyber']} src={imgMuiten} />
                <img className={css['img-cyber']} src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/chudeFE21.svg" />
            </div>

            <form onSubmit={formik.handleSubmit} className={css['register-form']}>
                <h2 className={css['h2-register']}>Đăng kí <NoteIcon /></h2>
                <div className={css['input-container']}>

                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik} 
                        {...formik.getFieldProps('taiKhoan')} placeholder="Tài khoản" />
                    </div>


                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik} 
                        {...formik.getFieldProps('matKhau')} placeholder="Mật khẩu" />
                        
                    </div>

                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik}
                        {...formik.getFieldProps('hoTen')} placeholder="Họ tên" />
                        
                    </div>

                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik}
                        {...formik.getFieldProps('soDT')} placeholder="Số điện thoại" />
                       
                    </div>

                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik} 
                        {...formik.getFieldProps('maNhom')} placeholder="Mã nhóm"/>
                        
                    </div>

                    <div className={css['input-form']}>
                        <InputForm 
                        formik={formik}
                        {...formik.getFieldProps('email')} placeholder="Email"/>
                        
                    </div>
                </div>
                <div className={css['button-register']}>
                    <ButtonQT type="submit" title='Đăng kí' />  
                    {/* <Link to='/profile'><ButtonQT type="submit" title='Đăng kí' /></Link> */}
                </div>
            </form>

        </div>

    )
}

export default Register
