import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userForUpdate } from '../../../redux/slices/user.slice'
import { useFormik } from 'formik'
import InputElearning from '../../../components/input-elearning'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import css from './them-sua-nguoi-dung.module.scss'
import {
    ALERT_CONFIG,
    API_STATUS,
    COMMON_MESSAGE,
    ERROR_MESSAGE,
    FIELD_NAME,
    FIELD_NAME_WIDTH_SPACE,
    LOAI_NGUOI_DUNG,
} from '../../../constants'
import { ShowPage } from '../quan-li-nguoi-dung'
import * as Y from 'yup'
import { createUser, updateUser } from '../../../services/user.service'
import { UserProfile } from '../../../types'
export default function ThemSuaNguoiDung(props: any) {
    const [apiUserStatus, setApiUserStatus] = useState<string>(
        API_STATUS.pending,
    )
    const dataUserForUpdate = useSelector(userForUpdate)
    const { showPage, setShowPage } = props
    useEffect(() => {
        if (showPage === ShowPage.update) {
            formik.setFieldValue(
                FIELD_NAME.loaiNguoiDung,
                dataUserForUpdate.maLoaiNguoiDung,
            )
            formik.setFieldValue(FIELD_NAME.hoTen, dataUserForUpdate.hoTen)
            formik.setFieldValue(
                FIELD_NAME.soDienThoai,
                dataUserForUpdate.soDienThoai,
            )
            formik.setFieldValue(FIELD_NAME.email, dataUserForUpdate.email)
            formik.setFieldValue(
                FIELD_NAME.taiKhoan,
                dataUserForUpdate.taiKhoan,
            )
        }
    }, [])
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
        matKhau: Y.string().when([], () =>
            showPage === ShowPage.add
                ? Y.string()
                      .required(ERROR_MESSAGE.matKhauEmpty)
                      .min(6, ERROR_MESSAGE.matKhauTooShort)
                      .max(20, ERROR_MESSAGE.matKhauTooLong)
                : Y.string()
                      .min(6, ERROR_MESSAGE.matKhauTooShort)
                      .max(20, ERROR_MESSAGE.matKhauTooLong),
        ),
    })
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            email: '',
            matKhau: '',
            soDienThoai: '',
            hoTen: '',
            loaiNguoiDung: LOAI_NGUOI_DUNG.GV,
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            const data: UserProfile = {
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                hoTen: values.hoTen,
                soDT: values.soDienThoai,
                maLoaiNguoiDung: values.loaiNguoiDung,
                maNhom: 'GP01',
                email: values.email,
            }
            if (showPage === ShowPage.add) {
                setApiUserStatus(API_STATUS.fetching)
                createUser(data)
                    ?.then(() => {
                        setApiUserStatus(API_STATUS.fetchingSuccess)
                        toast.success(COMMON_MESSAGE.thanhCong, ALERT_CONFIG)
                        formik.resetForm()
                        formik.setFieldValue(FIELD_NAME.loaiNguoiDung, LOAI_NGUOI_DUNG.GV)
                    })
                    .catch((er) => {
                        setApiUserStatus(API_STATUS.fetchingError)
                        toast.error(
                            er.response.data || COMMON_MESSAGE.thatBai,
                            ALERT_CONFIG,
                        )
                    })
            } else {
                setApiUserStatus(API_STATUS.fetching)
                updateUser(data)
                    ?.then((resp: any) => {
                        if (resp) {
                            setApiUserStatus(API_STATUS.fetchingSuccess)
                            toast.success(COMMON_MESSAGE.thanhCong, ALERT_CONFIG)
                            formik.setFieldValue(FIELD_NAME.matKhau, "")
                        }
                    })
                    .catch((err) => {
                        setApiUserStatus(API_STATUS.fetchingError)
                        toast.error(err.response.data, ALERT_CONFIG)
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
                                disabled={showPage === ShowPage.update}
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
                        {showPage == ShowPage.add ? (
                            <Button
                                disabled={apiUserStatus == API_STATUS.fetching}
                                htmlType='submit'
                                type='primary'
                            >
                                Thêm
                            </Button>
                        ) : (
                            <Button
                                disabled={apiUserStatus == API_STATUS.fetching}
                                htmlType='submit'
                                type='primary'
                            >
                                Cập nhật
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}
