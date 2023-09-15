import CardCyber from '../card/card'
import css from './list-card.module.scss'
export default function ListCard() {
    return (
        <div className={css['list-cart']}>
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
            <CardCyber />
        </div>
    )
}
