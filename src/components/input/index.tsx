import css from './input.module.scss'

function InputForm(props: any) {
    const {type, placeholder, name, onChange, value} = props
  return (
    <input name={name} onChange={onChange} value={value}  type={type} placeholder={placeholder} className={css['input-form']}/>
  )
}

export default InputForm
