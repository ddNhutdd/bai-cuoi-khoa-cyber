import { Input, Select } from 'antd';
import { useEffect, useState } from 'react'
import css from './input.module.scss'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { layDanhMucKhoaHoc } from '../../services/khoa-hoc.service';

function InputForm(props: any) {
  const { showEye, type, placeholder, disabled, dropdown, dropdownValue, dropdown2, dropdownValue2, setFieldValue, ...field } = props
  const { touched, errors } = field.formik;
  const [password, setPassword] = useState(false); 
  const [listDropdown2, setListDropdown2] = useState([]);

  const changeEye = () => {
    setPassword(!password);
  };

  const inputSuffix = type === 'password' && (
    <span className={css['input-eye']} onClick={changeEye}>
      {password ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </span>
  );

  const listDropdown1 = [
    {
      value: 'GV',
      label: 'GV',
    },
    {
      value: 'HV',
      label: 'HV',
    },
  ]
  const onChangeDropdown1 = (selectedValue: {
    value: string
    label: string
  }) => {
    setFieldValue('maLoaiNguoiDung', selectedValue)
  }
  const fetchMaKhoaHoc = async () => {
    try {
      const menuDanhMuc = await layDanhMucKhoaHoc();
      const transformedItems = menuDanhMuc.map((item:any) => ({
        value: item.maDanhMuc,
        label: item.maDanhMuc,
      }));
  
      setListDropdown2(transformedItems);
    } catch (error) {
      console.error('Error fetching listDropdown2:', error);
    }
  }
  useEffect(() => {
    fetchMaKhoaHoc(); 
  }, []);
  const onChangeDropdown2 = (selectedValue: {
    value: string
    label: string
  }) => {
    setFieldValue('maDanhMucKhoaHoc', selectedValue)
  }


  return (
    <>
      <div className={css['input-eye']}>
        {dropdown ? (
          <Select // Sử dụng Select cho trường "Loại người dùng"
            value={dropdownValue}
            className={css['select-form']}
            onChange={onChangeDropdown1}
            options={listDropdown1}
          >
          </Select>
        ) : dropdown2 ? (
          <Select // Sử dụng Select cho trường "maDanhMucKhoaHoc"
            value={dropdownValue2}
            className={css['select-form']}
            onChange={onChangeDropdown2}
            options={listDropdown2}
          >
          </Select>
        ) :
          <Input // Sử dụng Input cho các trường khác
            {...field}
            type={type === 'password' ? (!password ? 'password' : 'text') : type}
            placeholder={placeholder}
            disabled={disabled}
            className={css['input-form']}
            suffix={inputSuffix}
          />
        }
      </div>

      {touched[field.name] && errors[field.name] && (
        <p className={css['p-errors']}>{errors[field.name]}</p>)}
    </>

  )
}

export default InputForm
