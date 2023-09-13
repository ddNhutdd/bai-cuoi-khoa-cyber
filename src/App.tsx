import { Provider as ReduxProvider } from "react-redux";
import { GlobalStyle } from "./components/global-style/global-style";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/config-store";
import { router } from "./router/router";

function App() {

  return (
    <ReduxProvider store={store}>
      <GlobalStyle>
        <RouterProvider router={router} />
      </GlobalStyle>
    </ReduxProvider>
  )
}

export default App
