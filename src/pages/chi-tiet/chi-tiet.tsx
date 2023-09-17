import { StarRating } from '../../components/card/starRating/star-rating'
import bannerImage from '../../assets/imgs/chitet_banner_2.jpg'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import css from './chi-tiet.module.scss'
import { layThongTinKhoaHoc } from '../../services/khoa-hoc.service'
export default function ChiTiet() {
    const { maKhoaHoc } = useParams()
    const [khoaHoc, setKhoaHoc] = useState<any>()
    useEffect(() => {
        fetchData(maKhoaHoc ?? '')
    }, [])
    useEffect(()=>{
        console.log(khoaHoc)
    },[khoaHoc])
    const fetchData = async (maKhoaHoc: string) => {
        const data = await layThongTinKhoaHoc(maKhoaHoc)
        if (typeof data === 'string') {
            return
        }
        setKhoaHoc(data)
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
                                    <Button type='primary' ghost>
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
                    <p>
                        {khoaHoc && khoaHoc.moTa}
                    </p>
                </div>
            </div>
        </>
    )
}
