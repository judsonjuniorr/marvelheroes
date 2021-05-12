import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from 'routes'
import store from 'store'

import GlobalStyles from 'styles/global'

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
      <GlobalStyles />
    </BrowserRouter>
  </Provider>
)

export default App
