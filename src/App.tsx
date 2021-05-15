import Footer from 'components/Footer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Routes from 'routes'
import store from 'store'

import GlobalStyles from 'styles/global'

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="contentWrapper">
        <Routes />
      </div>
      <Footer />
      <GlobalStyles />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
)

export default App
