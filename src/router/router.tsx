import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
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
