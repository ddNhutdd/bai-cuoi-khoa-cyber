import { useFormik } from "formik"
import css from './register.module.scss'
import imgMuiten from '../../assets/imgs/mui-ten.png'
import NoteIcon from "../../assets/icons/note.icon"
import ButtonQT from "../../components/button"
import InputForm from "../../components/input"
import * as Y from 'yup'
import { register } from "../../services/user.service"
import { UserRegister } from "../../types"
import { useNavigate } from "react-router-dom"
import { ALERT_CONFIG, COMMON_MESSAGE, URL_NAVIGATE, VALIDATITON } from "../../constants"
import { toast } from 'react-toastify'

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

function Register() {
    const navigate = useNavigate();
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
            const data: UserRegister = {
                taiKhoan: value.taiKhoan,
                matKhau: value.matKhau,
                hoTen: value.hoTen,
                soDT: value.soDT,
                maNhom: value.maNhom,
                email: value.email
            }
            register(data)
                .then((data) => {
                    if (data) {
                        toast.success(COMMON_MESSAGE.dangKiThanhCong, ALERT_CONFIG)
                        
                        setTimeout(() => {
                            navigate(URL_NAVIGATE.login)
                        }, 3000); 
                        
                    }
                    else {
                        toast.error(COMMON_MESSAGE.dangKiThatBai, ALERT_CONFIG)
                    }

                })
                .catch((err) => {
                    console.log(err)
                    toast.error(COMMON_MESSAGE.dangKiThatBai, ALERT_CONFIG)
                });
        },
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
                            {...formik.getFieldProps('matKhau')}
                            type='password'
                            showEye={true}
                            placeholder="Mật khẩu" />

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
                            {...formik.getFieldProps('maNhom')} placeholder="Mã nhóm" />

                    </div>

                    <div className={css['input-form']}>
                        <InputForm
                            formik={formik}
                            {...formik.getFieldProps('email')} placeholder="Email" />

                    </div>
                </div>
                <div className={css['button-register']}>
                    <ButtonQT type="submit" title='Đăng kí' />
                </div>
            </form>

        </div>

    )
}

export default Register
