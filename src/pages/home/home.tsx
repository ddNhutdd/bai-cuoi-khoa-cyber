import ListCard from '../../components/list-card/list-card'
import css from './home.module.scss'
import { Button } from 'antd'
export default function Home() {
    return (
        <div className={css['home-container']}>
            <div className={css['home-container__banner']}>
                <div className={css['home-container__banner-content']}>
                    <h2>KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN</h2>
                    <p>Trở thành lập trình chuyên nghiệp tại Cybersoft</p>
                    <div className={css['home-container__action']}>
                        <Button type='primary'>Xem khoá học</Button>
                        <Button type='primary' ghost>
                            Tư vấn học
                        </Button>
                    </div>
                </div>
            </div>
            <div className={css['home-container']}>
                <div className={css['home-container__title']}>
                    Các khoá học mới nhất
                </div>
                <ListCard />
            </div>
        </div>
    )
}
