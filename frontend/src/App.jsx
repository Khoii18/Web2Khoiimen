import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App