import React from 'react'
import { useState } from 'react'
import Navbar from '../Navbar'
import './index.css'
import Report from '../Report'

const Results = props => {
    const { unattempted, totalQuestions, correctAnswers, wrongAnswers, unattemptedQuestions } = props
    const passed = correctAnswers >= 5

    const imageUrl = passed
        ? "https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
        : "https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
    const imageClass = passed ? "results-image-pass" : "results-image-lose"

    const attempted = totalQuestions - unattempted
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const [showReport, setShowReport] = useState(false)
    const [reportData, setReportData] = useState(null);


    const handleReport = () => {
        setReportData({
            unattempted,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            unattemptedQuestions: Array.isArray(unattemptedQuestions) ? [...unattemptedQuestions] : []
          });
        setShowReport(true)
    }

    if (showReport && reportData) {
        return <Report {...reportData} />;
      }
    
    return (
        <>
            <Navbar />
            <div className='results-container'>
                <div className={passed ? 'results-content-passed' : 'results-content-failed'}>
                    
                    <img src={imageUrl} className={imageClass} alt={passed ? "Won" : "Lose"} />
                    <span className='results-heading'>{passed ? "Congrats!" : "You Lose!"}</span>
                    <span className='percentage'>{percentage}% Correctly Answered</span>
                    {passed ? (
                        <span className='result'>Quiz Completed Successfully</span>
                    ) : (
                        <span className='result'>Quiz Failed</span>
                    )}
                    <span className='questions-attempted'>
                        You attempted {correctAnswers} out of {totalQuestions} questions as correct.
                    </span>
                    <button onClick={handleReport}>Report</button>
                </div>
            </div>
        </>
    )
}

export default Results