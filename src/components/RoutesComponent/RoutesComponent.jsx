import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const RoutesComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
