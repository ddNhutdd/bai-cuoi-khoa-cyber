import ScrollToTop from '../../components/scroll-to-top'
import Footer from '../footer/footer'
import Header from '../header/header'
import { Outlet } from 'react-router-dom'
export default function UserTemplate() {
    return (
        <ScrollToTop>
            <Header />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}
