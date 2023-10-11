import { Input } from 'antd';
import css from './input.module.scss'

function InputForm(props: any) {
  const {showEye, type, placeholder, disabled, ...field } = props
  const { touched, errors } = field.formik;

  return (
    <>
    <div className={css['input-eye']}>
      <Input {...field} type={type} placeholder={placeholder} disabled={disabled} className={css['input-form']} />
    </div>
      
      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>

  )
}

export default InputForm
