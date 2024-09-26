import { Provider } from 'react-redux'
import ErrorBoundary from './components/ErrorBoundry'
import AppRouter from './router/AppRouter'
import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      
    </ErrorBoundary>
  )
}

export default App