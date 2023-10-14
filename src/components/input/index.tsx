import { Input } from 'antd';
import { useState } from 'react'
import css from './input.module.scss'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function InputForm(props: any) {
  const { showEye, type, placeholder, disabled, ...field } = props
  const { touched, errors } = field.formik;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputSuffix = type === 'password' && (
    <span onClick={togglePasswordVisibility}>
      {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
    </span>
  );

  return (
    <>
      <div className={css['input-eye']}>
        <Input
          {...field}
          type={passwordVisible ? 'password' : 'text'}
          placeholder={placeholder}
          disabled={disabled}
          className={css['input-form']}
          suffix={inputSuffix}
        />
      </div>

      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>

  )
}

export default InputForm
