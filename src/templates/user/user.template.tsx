import Footer from '../footer/footer'
import Header from '../header/header'
import { Outlet } from 'react-router-dom'
export default function UserTemplate() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
