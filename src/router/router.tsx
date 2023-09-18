import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import UserTemplate from '../templates/user/user.template'

import AdminTemplate from '../templates/admin/admin.template'
const Home = lazy(() => import('../pages/home/home'))
const DanhMuc = lazy(() => import('../pages/danh-muc/danh-muc'))
const ChiTiet = lazy(() => import('../pages/chi-tiet/chi-tiet'))
const Register = lazy(() => import('../pages/register'))
const Login = lazy(() => import('../pages/login'))
const Profile = lazy(() => import("../pages/profile"));

const NguoiDung = lazy(
    () => import('../pages/quan-li-nguoi-dung/quan-li-nguoi-dung'),
)
const KhoaHoc = lazy(() => import('../pages/quan-li-khoa-hoc/quan-li-khoa-hoc'))
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
                path: '/DanhMucKhoaHoc',
                element: (
                    <Suspense>
                        <DanhMuc />
                    </Suspense>
                ),
            },
            {
                path: '/chitiet/:maKhoaHoc',
                element: (
                    <Suspense>
                        <ChiTiet />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: '/profile',
                element: (
                    <Suspense>
                        <Profile/>
                    </Suspense>
                ),
            }
        ],
    },
    {
        element: <AdminTemplate />,
        path: 'admin',
        children: [
            {
                path: 'quanlinguoidung',
                element: (
                    <Suspense>
                        <NguoiDung />
                    </Suspense>
                ),
            },
            {
                path: 'quanlikhoahoc',
                element: (
                    <Suspense>
                        <KhoaHoc />
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
