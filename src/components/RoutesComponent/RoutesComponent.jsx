import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { RegPage } from 'pages/RegPage/RegPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const RoutesComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
