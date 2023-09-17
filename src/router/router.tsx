import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import UserTemplate from '../templates/user/user.template'

const Home = lazy(() => import('../pages/home/home'));
const DanhMuc = lazy(() => import("../pages/danh-muc/danh-muc"));
const ChiTiet = lazy(() => import("../pages/chi-tiet/chi-tiet"));


export const router = createBrowserRouter([
    {
        element: <UserTemplate />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: '/danhmuckhoahoc',
                element: (
                    <Suspense>
                        <DanhMuc />
                    </Suspense>
                ),
            },
            {
                path: '/chitiet',
                element: (
                    <Suspense>
                        <ChiTiet />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '*',
        element: 'Trang không được tìm thấy!!!',
    },
])
