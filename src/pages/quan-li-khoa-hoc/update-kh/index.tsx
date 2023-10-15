import * as Y from 'yup'
import ButtonQT from '../../../components/button'
import { capNhatKhoaHoc, thongTinKhoaHoc, upLoadHinhAnhKhoaHoc } from '../../../services/khoa-hoc.service'
import { toast } from 'react-toastify'
import { ALERT_CONFIG, COMMON_MESSAGE, VALIDATITON } from '../../../constants'
import { useFormik } from 'formik'
import InputForm from '../../../components/input'
import css from './update-kh.module.scss'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { isPage } from '..'


const registerSchema = Y.object({

    maKhoaHoc: Y.string()
        .min(3, VALIDATITON.maKhoaHoc_Min)
        .max(20, VALIDATITON.maKhoaHoc_Max)
        .required(VALIDATITON.maKhoaHoc_Required),
    biDanh: Y.string()
        .min(6, VALIDATITON.biDanh_Min)
        .max(50, VALIDATITON.biDanh_Max)
        .required(VALIDATITON.biDanh_Required),
    tenKhoaHoc: Y.string()
        .min(6, VALIDATITON.tenKhoaHoc_Min)
        .max(30, VALIDATITON.tenKhoaHoc_Max)
        .required(VALIDATITON.tenKhoaHoc_Required),
    moTa: Y.string()
        .min(1, VALIDATITON.moTa_Min)
        .max(100, VALIDATITON.moTa_Max)
        .required(VALIDATITON.moTa_Required),
    luotXem: Y.number()
        .min(0, VALIDATITON.luotXem_Min)
        .max(5000, VALIDATITON.luotXem_Max)
        .required(VALIDATITON.luotXem_Required),
    soLuongHocVien: Y.number()
        .min(0, VALIDATITON.danhGia_Min)
        .max(5000, VALIDATITON.danhGia_Max)
        .required(VALIDATITON.danhGia_Required),
    hinhAnh: Y.string()
        .required(VALIDATITON.hinhAnh_Required),
    maNhom: Y.string()
        .min(3, VALIDATITON.maNhom_Min)
        .max(30, VALIDATITON.maNhom_Max)
        .required(VALIDATITON.maNhom_Required),
    ngayTao: Y.string()
        .min(6, VALIDATITON.ngayTao_Min)
        .max(20, VALIDATITON.ngayTao_Max)
        .required(VALIDATITON.ngayTao_Required),
    maDanhMucKhoaHoc: Y.string()
        .min(3, VALIDATITON.maDanhMucKhoaHoc_Min)
        .max(20, VALIDATITON.maDanhMucKhoaHoc_Max)
        .required(VALIDATITON.maDanhMucKhoaHoc_Required),
    taiKhoanNguoiTao: Y.string()
        .min(3, VALIDATITON.tkNguoiTao_Min)
        .max(20, VALIDATITON.tkNguoiTao_Max)
        .required(VALIDATITON.tkNguoiTao_Required),
})
function UpdateKH(props: any) {
    const { maKhoaHoc, setPage } = props
    const [isEditMode, setIsEditMode] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null)
    const formik = useFormik({
        initialValues: {
            maKhoaHoc: '',
            biDanh: '',
            tenKhoaHoc: '',
            moTa: '',
            luotXem: 0,
            soLuongHocVien: 0,
            hinhAnh: '',
            maNhom: '',
            ngayTao: '',
            maDanhMucKhoaHoc: '',
            taiKhoanNguoiTao: ''

        },
        validationSchema: registerSchema,

        onSubmit: async (value) => {
            const data = {
                maKhoaHoc: value.maKhoaHoc,
                biDanh: value.biDanh,
                tenKhoaHoc: value.tenKhoaHoc,
                moTa: value.moTa,
                luotXem: value.luotXem,
                soLuongHocVien: value.soLuongHocVien,
                hinhAnh: value.hinhAnh,
                maNhom: value.maNhom,
                ngayTao: value.ngayTao,
                maDanhMucKhoaHoc: value.maDanhMucKhoaHoc,
                taiKhoanNguoiTao: value.taiKhoanNguoiTao
            }
            try {
                const response = await capNhatKhoaHoc(data);
                if (response.statusText === 'OK') {
                    toast.success(COMMON_MESSAGE.capNhatSuccess, ALERT_CONFIG)
                    if (fileInput.current?.files?.length) {
                        const formData = new FormData();
                        formData.append('file', fileInput.current.files[0]);
                        formData.append('tenKhoaHoc', response.data.tenKhoaHoc);    
                        const result = await upLoadHinhAnhKhoaHoc(formData);
                        console.log(result)
                    }
                }
                else {
                    toast.error(response, ALERT_CONFIG)
                }
            } catch (error) {
                console.log(error)
            }
        },
    })
    const ma = maKhoaHoc
    useEffect(() => {
        const fetchData = async () => {
            const data = await thongTinKhoaHoc(ma);
            const { maKhoaHoc, biDanh, tenKhoaHoc, moTa, luotXem, hinhAnh, maNhom, ngayTao, soLuongHocVien } = data?.data ?? {};
            const { taiKhoan } = data?.data.nguoiTao;
            const { maDanhMucKhoahoc } = data?.data.danhMucKhoaHoc;
            formik.setFieldValue('maKhoaHoc', maKhoaHoc);
            formik.setFieldValue('biDanh', biDanh);
            formik.setFieldValue('tenKhoaHoc', tenKhoaHoc);
            formik.setFieldValue('moTa', moTa);
            formik.setFieldValue('luotXem', luotXem);
            formik.setFieldValue('hinhAnh', hinhAnh);
            formik.setFieldValue('maNhom', maNhom);
            formik.setFieldValue('ngayTao', ngayTao);
            formik.setFieldValue('soLuongHocVien', soLuongHocVien);
            formik.setFieldValue('maDanhMucKhoaHoc', maDanhMucKhoahoc);
            formik.setFieldValue('taiKhoanNguoiTao', taiKhoan);
        };
        fetchData();
    }, [maKhoaHoc]);

   
    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    }

    return (
        <div>
            <div className={css['tro-lai']} onClick={() => setPage(isPage.list)}>{'<< '}Trở lại danh sách</div>
            <p className={css['add-kh']}>Cập nhật khóa học</p>
            <form onSubmit={formik.handleSubmit} className={css['profile-form']}>
                <div className={css['input-forms-container']}>
                    <div className={css['input-row']}>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Mã khóa học</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('maKhoaHoc')}
                                placeholder="Mã khóa học"
                            />
                        </div>

                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Bí danh</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('biDanh')}
                                placeholder="Bí danh"
                            />
                        </div>
                    </div>
                    <div className={css['input-row']}>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Tên khóa học</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('tenKhoaHoc')}
                                placeholder="Tên khóa học" />
                        </div>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Mô tả</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('moTa')}
                                placeholder="Mô tả" />
                        </div>
                    </div>
                    <div className={css['input-row']}>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Lượt xem</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('luotXem')}
                                placeholder="Lượt xem" />
                        </div>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Số lượng học viên</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('soLuongHocVien')}
                                placeholder="Số lượng học viên" />
                        </div>
                    </div>
                    <div className={css['input-row']}>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Tài khoản người tạo</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('taiKhoanNguoiTao')}
                                placeholder="Tài khoản người tạo" />
                        </div>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Mã nhóm</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('maNhom')}
                                placeholder="Mã nhóm" />
                        </div>
                    </div>
                    <div className={css['input-row']}>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Ngày tạo</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('ngayTao')}
                                placeholder="Ngày tạo" />
                        </div>
                        <div className={css['input-ele']}>
                            <p className={css['p-title']}>Mã danh mục khóa học</p>
                            <InputForm
                                formik={formik}
                                {...formik.getFieldProps('maDanhMucKhoaHoc')}
                                placeholder="Mã danh mục khóa học" />
                        </div>
                    </div>
                    <div className={css['input-row']}>
                        <div className={css['input-eleImg']}>
                            <p className={css['p-title']}>Hình ảnh</p>
                            {
                                isEditMode ? (
                                    <input
                                        type="file"
                                        ref={fileInput}
                                    />
                                ) : (
                                    <InputForm
                                        formik={formik}
                                        {...formik.getFieldProps('hinhAnh')}
                                        placeholder="Hình ảnh"
                                    />
                                )
                            }
                        </div>
                        <div className={css['button-updateImg']}>
                            <Button onClick={toggleEditMode}>Chỉnh sửa ảnh</Button>
                        </div>


                    </div>
                </div>
                <div><ButtonQT title='Cập nhật' type='submit' /></div>
            </form>
        </div>
    )
}
export default UpdateKH
