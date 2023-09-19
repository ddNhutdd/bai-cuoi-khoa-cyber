import css from './input.module.scss'

function InputForm(props: any) {
    const {type, placeholder, field, touched, errors} = props
  return (
    <>
      <input {...field}  type={type} placeholder={placeholder} className={css['input-form']}/>
      {touched && errors && <p className={css['p-errors']}>{errors}</p>}
    </>
    
  )
}

export default InputForm
