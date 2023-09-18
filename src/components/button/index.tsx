import  css from './button.module.scss'

function ButtonQT(props: any) {
    const {title, type} = props
  return (
    <button type={type} className={css['button-qt']}>{title}</button>
  )
}

export default ButtonQT
