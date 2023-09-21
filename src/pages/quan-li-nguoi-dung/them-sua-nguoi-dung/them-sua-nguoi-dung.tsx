import { Button } from 'antd'
import InputElearning from '../../../components/input-elearning'
import css from './them-sua-nguoi-dung.module.scss'
export default function ThemSuaNguoiDung(props: any) {
    const { setShow } = props
    return (
        <div className={css['them-sua-nguoi-dung']}>
            <div className={css['them-sua-nguoi-dung__title']}>
                Thêm người dùng
            </div>
            <form>
                <div className={css['them-sua-nguoi-dung__input-contaier']}>
                    <div className={css['them-sua-nguoi-dung__left']}>
                        <InputElearning placeholder='Tài khoản' />
                        <InputElearning password placeholder='Mât khẩu' />
                        <InputElearning placeholder='Họ tên' />
                    </div>
                    <div className={css['them-sua-nguoi-dung__right']}>
                        <InputElearning placeholder='Email' />
                        <InputElearning placeholder='Số điện thoại' />
                        <InputElearning dropdown placeholder='Loại người dùng' />
                    </div>
                </div>
                <div className={css['them-sua-nguoi-dung__action']}>
                    <span
                        className={css['them-sua-nguoi-dung__return']}
                        onClick={() => {
                            setShow(0)
                        }}
                    >
                        {'<< Trở lại'}
                    </span>
                    <Button type='primary'>Thêm</Button>
                </div>
            </form>
        </div>
    )
}
