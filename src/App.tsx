import { Provider as ReduxProvider } from 'react-redux'
import { GlobalStyle } from './components/global-style/global-style'
import { RouterProvider } from 'react-router-dom'
import { store } from './redux/config-store'
import { router } from './router/router'
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <ReduxProvider store={store}>
            <GlobalStyle>
                <RouterProvider router={router} />
                <ToastContainer
                    position='top-center'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                />

            </GlobalStyle>
        </ReduxProvider>
    )
}
export default App
