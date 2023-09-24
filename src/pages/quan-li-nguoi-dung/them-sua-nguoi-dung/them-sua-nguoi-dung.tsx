import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import InputElearning from '../../../components/input-elearning'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import css from './them-sua-nguoi-dung.module.scss'
import {
    API_STATUS,
    COMMON_MESSAGE,
    ERROR_MESSAGE,
    FIELD_NAME,
    FIELD_NAME_WIDTH_SPACE,
} from '../../../constants'
import { ShowPage } from '../quan-li-nguoi-dung'
import * as Y from 'yup'
import { createUser } from '../../../services/user.service'
import { UserProfile } from '../../../types'
const alertConfig: any = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
}
export default function ThemSuaNguoiDung(props: any) {
    const [apiUserStatus, setApiUserStatus] = useState<string>(
        API_STATUS.pending,
    )
    const { showPage, setShowPage } = props
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    const userSchema = Y.object({
        taiKhoan: Y.string().required(ERROR_MESSAGE.taiKhoanEmpty),
        email: Y.string()
            .required(ERROR_MESSAGE.emailEmpty)
            .email(ERROR_MESSAGE.emailFormat),
        soDienThoai: Y.string()
            .matches(phoneRegExp, ERROR_MESSAGE.soDienThoaiFormat)
            .required(ERROR_MESSAGE.soDienThoaiEmpty),
        hoTen: Y.string().required(ERROR_MESSAGE.hoTenEmpty),
        matKhau: Y.string()
            .required(ERROR_MESSAGE.matKhauEmpty)
            .min(6, ERROR_MESSAGE.matKhauTooShort)
            .max(20, ERROR_MESSAGE.matKhauTooLong),
    })
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            email: '',
            matKhau: '',
            soDienThoai: '',
            hoTen: '',
            loaiNguoiDung: 'GV',
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            if (showPage === ShowPage.add) {
                setApiUserStatus(API_STATUS.fetching)
                const data: UserProfile = {
                    taiKhoan: values.taiKhoan,
                    matKhau: values.matKhau,
                    hoTen: values.hoTen,
                    soDT: values.soDienThoai,
                    maLoaiNguoiDung: values.loaiNguoiDung,
                    maNhom: 'GP01',
                    email: values.email,
                }
                createUser(data)
                    ?.then(() => {
                        setApiUserStatus(API_STATUS.fetchingSuccess)
                        toast.success(COMMON_MESSAGE.thanhCong, alertConfig)
                        formik.resetForm()
                        formik.setFieldValue(FIELD_NAME.loaiNguoiDung, 'GV')
                    })
                    .catch((er) => {
                        setApiUserStatus(API_STATUS.fetchingError)
                        toast.error(
                            er.response.data || COMMON_MESSAGE.thatBai,
                            alertConfig,
                        )
                    })
            }
        },
    })
    return (
        <>
            <div className={css['them-sua-nguoi-dung']}>
                <div className={css['them-sua-nguoi-dung__title']}>
                    {showPage == ShowPage.add ? 'Thêm' : 'Cập nhật'} người dùng
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={css['them-sua-nguoi-dung__input-contaier']}>
                        <div className={css['them-sua-nguoi-dung__left']}>
                            <InputElearning
                                getFieldProps={formik.getFieldProps(
                                    FIELD_NAME.taiKhoan,
                                )}
                                placeholder={FIELD_NAME_WIDTH_SPACE.taiKhoan}
                                touched={formik.touched.taiKhoan}
                                error={formik.errors.taiKhoan}
                            />
                            <InputElearning
                                password
                                placeholder={FIELD_NAME_WIDTH_SPACE.matKhau}
                                getFieldProps={formik.getFieldProps(
                                    FIELD_NAME.matKhau,
                                )}
                                touched={formik.touched.matKhau}
                                error={formik.errors.matKhau}
                            />
                            <InputElearning
                                getFieldProps={formik.getFieldProps(
                                    FIELD_NAME.hoTen,
                                )}
                                touched={formik.touched.hoTen}
                                error={formik.errors.hoTen}
                                placeholder={FIELD_NAME_WIDTH_SPACE.hoTen}
                            />
                        </div>
                        <div className={css['them-sua-nguoi-dung__right']}>
                            <InputElearning
                                getFieldProps={formik.getFieldProps(
                                    FIELD_NAME.email,
                                )}
                                touched={formik.touched.email}
                                error={formik.errors.email}
                                placeholder={FIELD_NAME_WIDTH_SPACE.email}
                            />
                            <InputElearning
                                getFieldProps={formik.getFieldProps(
                                    FIELD_NAME.soDienThoai,
                                )}
                                touched={formik.touched.soDienThoai}
                                error={formik.errors.soDienThoai}
                                placeholder={FIELD_NAME_WIDTH_SPACE.soDienThoai}
                            />
                            <InputElearning
                                dropdown
                                placeholder={
                                    FIELD_NAME_WIDTH_SPACE.loaiNguoiDung
                                }
                                dropdownValue={formik.values.loaiNguoiDung}
                                setFieldValue={formik.setFieldValue}
                            />
                        </div>
                    </div>
                    <div className={css['them-sua-nguoi-dung__action']}>
                        <span
                            className={
                                css['them-sua-nguoi-dung__return'] +
                                ' ' +
                                (apiUserStatus == API_STATUS.fetching &&
                                    css['disabled'])
                            }
                            onClick={() => {
                                if (apiUserStatus === API_STATUS.fetching)
                                    return
                                setShowPage(ShowPage.list)
                            }}
                        >
                            {'<< Trở lại'}
                        </span>
                        <Button
                            disabled={apiUserStatus == API_STATUS.fetching}
                            htmlType='submit'
                            type='primary'
                        >
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </>
    )
}
