import { Input, Select } from 'antd'
import css from './input-elearning.module.scss'
export default function InputElearning(props: any) {
    const { placeholder, password, dropdown, handleChange } = props
    const render = (password: boolean) => {
        if (dropdown)
            return (
                <Select
                    labelInValue
                    defaultValue={{ value: 'GV', label: 'GIÁO VIÊN' }}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'GV',
                            label: 'GIÁO VIÊN',
                        },
                        {
                            value: 'HV',
                            label: 'HỌC VIÊN',
                        },
                    ]}
                />
            )
        if (password) return <Input.Password placeholder={placeholder} />
        if (!password) return <Input placeholder={placeholder} />
    }
    return (
        <div className={css['input-elearning']}>
            <p>{placeholder}</p>
            {render(password)}
            {!dropdown ? <small>Error</small> : ''}
        </div>
    )
}
