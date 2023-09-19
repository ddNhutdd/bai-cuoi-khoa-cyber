import { StarRating } from '../../components/card/starRating/star-rating'
import bannerImage from '../../assets/imgs/chitet_banner_2.jpg'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import css from './chi-tiet.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    dangKiKhoaHoc,
    layThongTinKhoaHoc,
} from '../../services/khoa-hoc.service'
import { getLocalStorage } from '../../utils'
import { ACCESS_TOKEN, HO_TEN } from '../../constants'
import { API_RESPONSE, URL_NAVIGATE } from '../../constants'
import { useNavigate } from 'react-router-dom'
export default function ChiTiet() {
    const { maKhoaHoc } = useParams()
    const [khoaHoc, setKhoaHoc] = useState<any>()
    const navigate = useNavigate()
    useEffect(() => {
        fetchData(maKhoaHoc ?? '')
    }, [])
    const fetchData = async (maKhoaHoc: string) => {
        const data = await layThongTinKhoaHoc(maKhoaHoc)
        if (typeof data === 'string') {
            return
        }
        setKhoaHoc(data)
    }
    const dangKiClickHandle = async () => {
        const access_token = getLocalStorage(ACCESS_TOKEN)
        const taiKhoan = getLocalStorage(HO_TEN)
        if (!access_token || !taiKhoan) {
            navigate(URL_NAVIGATE.login)
            return
        }
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
        const data = await dangKiKhoaHoc(maKhoaHoc ?? '', taiKhoan)
        if (data === API_RESPONSE.gdtc) {
            toast.success(data, alertConfig)
        } else {
            toast.error(data, alertConfig)
        }
    }
    return (
        <>
            <div>{}</div>
            <div className={css['chi-tiet']}>
                <div className={css['chi-tiet__banner']}>
                    <div className={css['chi-tiet__banner__container']}>
                        <div className={css['chi-tiet__banner__content']}>
                            <div className={css['chi-tiet__left']}>
                                <h1>{khoaHoc && khoaHoc.biDanh}</h1>
                                <div
                                    className={css['chi-tiet__banner__rating']}
                                >
                                    <span>Đánh giá khoá học</span>{' '}
                                    <StarRating
                                        totalStars={5}
                                        selectedStars={4}
                                        onRate={() => {
                                            //
                                        }}
                                    />
                                </div>
                                <div
                                    className={css['chi-tiet__banner__action']}
                                >
                                    <Button
                                        type='primary'
                                        onClick={dangKiClickHandle}
                                    >
                                        Đăng kí
                                    </Button>
                                </div>
                            </div>
                            <div className={css['chi-tiet__right']}>
                                <img src={bannerImage} alt='...' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css['chi-tiet__content']}>
                    <h3 className={css['chi-tiet__denomination']}>
                        Giới thiệu khoá học (Phần mô tả khoá học)
                    </h3>
                    <p>{khoaHoc && khoaHoc.moTa}</p>
                </div>
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
