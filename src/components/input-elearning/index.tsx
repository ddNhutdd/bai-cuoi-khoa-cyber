import { Input, Select } from 'antd'
import css from './input-elearning.module.scss'
import { FIELD_NAME } from '../../constants'
export default function InputElearning(props: any) {
    const {
        placeholder,
        password,
        dropdown,
        getFieldProps,
        setFieldValue,
        touched,
        error,
        dropdownValue,
        disabled
    } = props
    const listDropdown = [
        {
            value: 'GV',
            label: 'GIÁO VỤ',
        },
        {
            value: 'HV',
            label: 'HỌC VIÊN',
        },
    ]
    const onChangeDropdown = (selectedValue: {
        value: string
        label: string
    }) => {
        setFieldValue(FIELD_NAME.loaiNguoiDung, selectedValue)
    }
    const render = () => {
        if (dropdown)
            return (
                <>
                    <Select
                        value={dropdownValue}
                        style={{ width: '100%' }}
                        onChange={onChangeDropdown}
                        options={listDropdown}
                    />
                </>
            )
        if (password)
            return (
                <Input.Password {...getFieldProps} placeholder={placeholder} />
            )
        if (!password)
            return <Input disabled={disabled} {...getFieldProps} placeholder={placeholder} />
    }
    return (
        <div className={css['input-elearning']}>
            <p>{placeholder}</p>
            {render()}
            {!dropdown && touched && error ? (
                <small className={css['--visibility-visible']}>{error}</small>
            ) : (
                <small>error</small>
            )}
        </div>
    )
}
