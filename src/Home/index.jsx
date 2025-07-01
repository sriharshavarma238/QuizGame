import React from 'react'
import Navbar from '../Navbar'
import './index.css'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const handleStart = () => {
    navigate('/quiz')
  }

  return (
    <div>
      <Navbar />
      <div className='home-container'>
        <div className='home-content'>
          <img src='https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png' alt='start quiz game' className='start-quiz-image' />
          <h1 className='home-head'>How Many Of These Questions Do You Actually Know?</h1>
          <p className='home-para'>Test yourself with these easy quiz questions and answers</p>
          <button className='start-quiz-button' onClick={handleStart}>Start Quiz</button>
        </div>
      </div>
    </div>
  )
}

export default Home
