import { useState } from 'react'
import LoginPage from './LoginPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import QuizGame from './QuizPage'
import NotFOund from './NotFound'

function App() {
  return(
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/quiz" element={<ProtectedRoute>
        <QuizGame />
      </ProtectedRoute>} />
      <Route path="*" element={<NotFOund />} />
    </Routes>
  )
  
}

export default App
