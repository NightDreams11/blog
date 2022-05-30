import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { PostsPage } from 'pages/PostsPage/PostsPage'
import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { RegPage } from 'pages/RegPage/RegPage'
import { Routes, Route } from 'react-router-dom'

export const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfilePage editMode />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </div>
  )
}
