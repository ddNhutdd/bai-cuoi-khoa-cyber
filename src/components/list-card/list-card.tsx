import CardCyber from '../card/card'
import css from './list-card.module.scss'
export default function ListCard(props: any) {
    const { list } = props
    const render = () => {
        if (!list) return
        return (
            <div className={css['list-cart']}>
                {list.map((n: any, index: number) => (
                    <CardCyber key={index++} item={n} />
                ))}
            </div>
        )
    }
    return render()
}
