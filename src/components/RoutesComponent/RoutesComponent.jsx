import { HomePage } from 'components/HomePage/HomePage'
import { LoginPage } from 'components/LoginPage/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const RoutesComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
