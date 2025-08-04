// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute'

import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PromptDetail from './components/PromptDetail'
import CommunityGuidelines from './pages/CommunityGuidelines'


import AdminPanel from './pages/AdminPanel'
import AdminUserList from './pages/AdminUserList'
import AdminPendingPrompts from './pages/AdminPendingPrompts'
import AdminApprovedPrompts from './pages/AdminApprovedPrompts'



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/our-vision" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/guidelines" element={<CommunityGuidelines />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />

          {/* Admin only routes */}
          <Route element={<PrivateRoute roles={['Admin']} />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/admin/prompts/pending" element={<AdminPendingPrompts />} />
            <Route path="/admin/prompts/approved" element={<AdminApprovedPrompts />} />
          
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<h1>404 - Sayfa bulunamadı</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
