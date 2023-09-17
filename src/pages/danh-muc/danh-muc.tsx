import ListCard from '../../components/list-card/list-card'
import Paging from '../../components/paging/paging'
import css from './danh-muc.module.scss'
export default function DanhMuc() {
    return (
        <div className={css['danh-muc']}>
            <div className={css['danh-muc__title']}>
                <h1>LẬP TRÌNH FRONTEND</h1>
            </div>
            <div className={css['danh-muc__container']}>
                <h3>Các khoá học phổ biến</h3>
                <ListCard />
                <div className={css['danh-muc__paging']}>
                    <Paging
                        totalItem={30}
                        selectedPage={3}
                        setSelectedPage={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}
