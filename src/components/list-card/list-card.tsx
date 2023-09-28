import CardCyber from '../card/card'
import css from './list-card.module.scss'
export default function ListCard(props: any) {
    const { list, isProfilePage, onDelete, taiKhoan } = props
    const render = () => {
        if (!list) return
        return (
            <div className={css['list-cart']}>
                {list.map((n: any, index: number) => (
                    <CardCyber key={index++} item={n} taiKhoan = {taiKhoan} isProfilePage = {isProfilePage} onDelete = {onDelete} />
                ))}
            </div>
        )
    }
    return render()
}
