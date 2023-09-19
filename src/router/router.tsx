import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Skeleton } from 'antd';
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
                    <Suspense fallback={<Skeleton />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: '/DanhMucKhoaHoc',
                element: (
                    <Suspense fallback={<Skeleton />}>
                        <DanhMuc />
                    </Suspense>
                ),
            },
            {
                path: '/chitiet/:maKhoaHoc',
                element: (
                    <Suspense fallback={<Skeleton />}>
                        <ChiTiet />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense fallback={<Skeleton />}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense fallback={<Skeleton />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: '/profile',
                element: (
                    <Suspense fallback={<Skeleton />}>
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
                    <Suspense fallback={<Skeleton />}>
                        <NguoiDung />
                    </Suspense>
                ),
            },
            {
                path: 'quanlikhoahoc',
                element: (
                    <Suspense fallback={<Skeleton />}>
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
