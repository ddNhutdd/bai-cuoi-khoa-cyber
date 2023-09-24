import EyeOpenIcon from '../../assets/icons/eye-open.icon';
import EyeSleepIcon from '../../assets/icons/eye-sleep.icon';
import css from './input.module.scss'
import {useState} from 'react'

function InputForm(props: any) {
  const {showEye, type, placeholder, disabled, ...field } = props
  const { touched, errors } = field.formik;

  const [inputType, setInputType] = useState(type);
  const handleChange = () => {
    setInputType((prevType: string) => (prevType === 'password' ? 'text' : 'password'));
  };
  return (
    <>
    <div className={css['input-eye']}>
      <input {...field} type={inputType} placeholder={placeholder} disabled={disabled} className={css['input-form']} />
      {showEye && (
        <span onClick={handleChange} className={css['eye']}>
          {inputType === 'password' ?<EyeSleepIcon/> : <EyeOpenIcon/>} 
        </span>
      )}
    </div>
      
      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>

  )
}

export default InputForm
