import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NavBar from '../components/NavBar'


const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<NavBar />} />
    </Routes>
    </Router>
  )
}

export default AppRouter