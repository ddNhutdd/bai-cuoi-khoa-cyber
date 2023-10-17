import { Input } from 'antd';
import { useState } from 'react'
import css from './input.module.scss'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function InputForm(props: any) {
  const { showEye, type, placeholder, disabled, ...field } = props
  const { touched, errors } = field.formik;
  const [password, setPassword] = useState(false);

  const changeEye = () => {
    setPassword(!password);
  };

  const inputSuffix = type === 'password' && (
    <span className={css['input-eye']} onClick={changeEye}>
      {password ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </span>
  );

  return (
    <>
      <div className={css['input-eye']}>
        <Input
          {...field}
          type={type === 'password' ? (!password ? 'password' : 'text') : type}
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
