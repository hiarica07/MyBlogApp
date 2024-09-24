import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ErrorBoundary from './components/ErrorBoundry'

function App() {
 

  return (
   <ErrorBoundary>
    Blog App
   </ErrorBoundary>
  )
}

export default App
