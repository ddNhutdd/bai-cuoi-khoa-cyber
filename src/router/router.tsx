import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import Home from '../pages/home/home'
import UserTemplate from '../templates/user/user.template'
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
        ],
    },
    {
        path: '*',
        element: 'Trang không được tìm thấy!!!',
    },
])
