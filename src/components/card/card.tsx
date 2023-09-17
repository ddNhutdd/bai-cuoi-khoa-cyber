import css from './card.module.scss'
import { StarRating } from './starRating/star-rating'
import { Button, Card } from 'antd'
export default function CardCyber() {
    const styleCard: React.CSSProperties = {
        position: 'relative',
    }
    return (
        <Card
            hoverable
            style={styleCard}
            cover={
                <img
                    alt='...'
                    src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                />
            }
        >
            <h3>Lập trình FRONEND với HTML CSS JAVASCRIPT</h3>
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
                <Button type='primary'>ĐĂNG KÍ</Button>
            </div>
        </Card>
    )
}
