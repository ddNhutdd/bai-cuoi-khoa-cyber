import { PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
function ScrollToTop({ children }: PropsWithChildren) {
    const location = useLocation()
    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
        })
    }, [location])
    return <>{children}</>
}
export default ScrollToTop
