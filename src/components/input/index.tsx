import { Input, Select } from 'antd';
import { useState } from 'react'
import css from './input.module.scss'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function InputForm(props: any) {
  const { showEye, type, placeholder, disabled, dropdown, dropdownValue, setFieldValue, ...field } = props
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

  const listDropdown = [
    {
      value: 'GV',
      label: 'GV',
    },
    {
      value: 'HV',
      label: 'HV',
    },
  ]
  const onChangeDropdown = (selectedValue: {
    value: string
    label: string
  }) => {
    setFieldValue('maLoaiNguoiDung', selectedValue)
  }

  return (
    <>
      <div className={css['input-eye']}>
        {dropdown ? (
          <Select // Sử dụng Select cho trường "Loại người dùng"
            value={dropdownValue}
            className={css['select-form']}
            onChange={onChangeDropdown}
            options={listDropdown}
          >
          </Select>
        ) : (
          <Input // Sử dụng Input cho các trường khác
            {...field}
            type={type === 'password' ? (!password ? 'password' : 'text') : type}
            placeholder={placeholder}
            disabled={disabled}
            className={css['input-form']}
            suffix={inputSuffix}
          />
        )}
      </div>

      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>

  )
}

export default InputForm
