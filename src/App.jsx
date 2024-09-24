import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ErrorBoundary from './components/ErrorBoundry'
import AppRouter from './router/AppRouter'

function App() {
 

  return (
   <ErrorBoundary>
    <AppRouter/>
   </ErrorBoundary>
  )
}

export default App
