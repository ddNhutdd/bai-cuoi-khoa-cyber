import ReCAPTCHA from 'react-google-recaptcha'
import { Input, Button } from 'antd'
import css from './footer.module.scss'
import logo from '../../assets/imgs/cyberlogo-white.png'
import footerImage from '../../assets/imgs/footerImg.jpg'
import { LocationIcon, PhoneIcon } from '../../assets/icons/icons'
export default function Footer() {
    return (
        <div className={css['footer']}>
            <div className={css['footer__container']}>
                <div className={css['footer__left']}>
                    <div className={css['footer__logo']}>
                        <img src={logo} alt='...' />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quibusdam, deserunt?
                        </p>
                    </div>
                    <div className={css['footer__subscribe']}>
                        <h3>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </h3>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Officia ducimus dicta eveniet non deleniti
                            dolor delectus alias ipsum explicabo earum, minus
                            quas, placeat esse sed, culpa ea quo praesentium
                            nemo?
                        </p>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <div className={css['footer__action-subscribe']}>
                            <Input placeholder='your.address@email.com' />
                            <Button type='primary'>ĐĂNG KÍ</Button>
                        </div>
                    </div>
                    <ul className={css['footer__contact']}>
                        <li>
                            <LocationIcon />
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </li>
                        <li>
                            <LocationIcon />
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </li>
                        <li>
                            <LocationIcon />
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </li>
                        <li>
                            <LocationIcon />
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </li>
                        <li>
                            <PhoneIcon />
                            <p>0908777666</p>
                        </li>
                    </ul>
                </div>
                <div className={css['footer__center']}>
                    <form>
                        <h3>ĐĂNG KÍ TƯ VẤN</h3>
                        <Input placeholder='Họ và tên *' />
                        <Input placeholder='Email liên hệ *' />
                        <Input placeholder='Điện thoại liên hệ *' />
                        <p>Nhấp vào ô bên dưới</p>
                        <CapCha />
                        <Button type='primary'>ĐĂNG KÍ TƯ VẤN</Button>
                    </form>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Numquam a nesciunt itaque rem vero, illo sed
                        pariatur ad optio eaque. Doloremque tempora culpa
                    </p>
                </div>
                <div className={css['footer__right']}>
                    <div className={css['footer__Image']}>
                        <img src={footerImage} alt='...' />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Voluptatum omnis asperiores nihil cupiditate eius
                        vel. Numquam quis quas est architecto?
                    </p>
                </div>
            </div>
        </div>
    )
}
const CapCha = () => {
    const REACT_APP_SITE_KEY = '6Ld73CQoAAAAAClgxO9aZbuzn4qmmlZ0Msr_gj0h'
    return <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} />
}
