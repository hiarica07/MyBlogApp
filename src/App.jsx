import { Provider } from 'react-redux'
import ErrorBoundary from './components/ErrorBoundary'
import AppRouter from './router/AppRouter'
import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { ToastContainer } from 'react-toastify'


function App() {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#387369", // pastel green
  //       second: "#5AB8A8",
  //       third: "#22453F",
  //     },
  //     secondary: {
  //       main: "#F6F4F0", // Light Cream
  //       second: "#5AB8A8"
  //     },
  //     customColors: {
  //       pink: "#D798B0",
  //       purple: "#8F5B8A",
  //       darkblue: "#2E5077",
  //       lightgreen: "#4DA1A9",
  //       green: "#79D7BE",
  //       darkgreen: "#459198",
  //     },
  //   },
  //   typography: {
  //     fontFamily: '"Urbanist", serif',
  //   },
  // });
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
            <ToastContainer/>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
