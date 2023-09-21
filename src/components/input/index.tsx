import css from './input.module.scss'

function InputForm(props: any) {
    const {type, placeholder, ...field} = props
    const { touched, errors } = field.formik;
  return (
    <>
      <input {...field}  type={type} placeholder={placeholder} className={css['input-form']}/>
      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>
    
  )
}

export default InputForm
