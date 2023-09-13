import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <>router</>
    },
    {
        path: '*',
        element: 'Trang không được tìm thấy!!!'
    }
])