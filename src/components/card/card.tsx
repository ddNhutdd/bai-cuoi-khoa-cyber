import css from './card.module.scss'
import { StarRating } from './starRating/star-rating'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom';

export default function CardCyber(props:any) {
    const navigate = useNavigate()
    const { item } = props
    const styleCard: React.CSSProperties = {
        position: 'relative',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    }
    const buttonDangKiHandleClick = () => {
        navigate('/chitiet/' + item.maKhoaHoc);
    }
    return (
        <Card
            hoverable={false}
            style={styleCard}
            cover={
                <img
                    alt='...'
                    src={item.hinhAnh}
                />
            }
        >
            <h3>{item.biDanh}</h3>
            <div className={css['card__content']}>
                <StarRating
                    totalStars={5}
                    selectedStars={4}
                    onRate={() => {
                        //
                    }}
                />
                <p>(1.593)</p>
            </div>
            <div className={css['card__action']}>
                <Button type='primary' onClick={buttonDangKiHandleClick}>ĐĂNG KÍ</Button>
            </div>
        </Card>
    )
}
