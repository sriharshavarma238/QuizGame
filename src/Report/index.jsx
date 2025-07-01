import React from 'react'
import Navbar from '../Navbar'
import './index.css'

const Report = props => {
    const { unattempted, totalQuestions, correctAnswers, wrongAnswers, unattemptedQuestions } = props
    const attempted = totalQuestions - unattempted

    const questionsArr = Array.isArray(unattemptedQuestions) ? unattemptedQuestions : []

    return (
        <>
            <Navbar />
            <div className='report-container'>
                <div className='report-content'>
                    <div className='no-of-attempted'>
                        <div className='attempted'>
                            <span style={{ color: "#0EA5E9", fontSize: "32px" }}>{correctAnswers}</span>
                            <span style={{ color: "#64748b", fontSize: "18px" }}>&nbsp;/ {totalQuestions}</span>
                        </div>
                        <div className='attempted-data'>
                            <div className='correct-answers'>
                                <img src='https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png' className='right-check' alt="correct" />
                                <span className='total-label'>{correctAnswers} Correct Answers</span>
                            </div>
                            <div className='wrong-answers'>
                                <img src='https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png' className='wrong-check' alt="wrong" />
                                <span className='total-label'>{wrongAnswers} Wrong Answers</span>
                            </div>
                            <div className='unattempted-answers'>
                                <img src='https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png' className='un-answered' alt="unattempted" />
                                <span className='total-label'>{unattempted} Unattempted</span>
                            </div>
                        </div>
                    </div>
                    <div className='unattempted-questions'>
                        <h2 className='title'>Unattempted Questions</h2>
                        {questionsArr.length === 0 ? (
                            <div style={{ color: "#888", margin: "1rem 0" }}>No unattempted questions.</div>
                        ) : (
                            questionsArr.map((question, idx) => (
                                <div className='unattempted-question' key={question.id || idx}>
                                    <h2 className='question'>{question.question_text}</h2>
                                    <div className={
                                        question.options_type === "IMAGE"
                                            ? "options image-options"
                                            : question.options_type === "SINGLE_SELECT"
                                                ? "options radio-options"
                                                : "options"
                                    }>
                                        {Array.isArray(question.options) && question.options.map((option, oidx) => {
                                            const isCorrect = option.is_correct === "true";
                                            if (question.options_type === "IMAGE") {
                                                return (
                                                    <div key={option.id || oidx} className="quiz-option-wrapper" style={{ display: "flex" , marginBottom: 8 }}>
                                                        <button
                                                            className="quiz-option-img-btn"
                                                            disabled
                                                            style={{ marginRight: 8, marginBottom: 8 }}
                                                        >
                                                            <img
                                                                src={option.image_url}
                                                                alt={`option-${oidx}`}
                                                                className="quiz-option-img"
                                                            />
                                                        </button>
                                                        {isCorrect && (
                                                            <span className="option-icon" style={{ marginLeft: 8 }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" strokeWidth="2" stroke="green">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            } else if (question.options_type === "SINGLE_SELECT") {
                                                // Radio with tick icon outside, no green background
                                                return (
                                                    <div key={option.id || oidx} className="quiz-option-wrapper" style={{ display: "flex", alignItems: "center", marginBottom: 8, justifyContent: "flex-start" }}>
                                                        <label className="report-quiz-option-radio-label" style={{ width: "auto", marginBottom: 0, color:"black"}}>
                                                            <input
                                                                type="radio"
                                                                name={`report-question-${idx}`}
                                                                value={oidx}
                                                                checked={false}
                                                                disabled
                                                                className="report-quiz-option-radio"
                                                                style={{ pointerEvents: "none" }}
                                                            />
                                                            <span>{option.text}</span>
                                                        </label>
                                                        {isCorrect && (
                                                            <span className="option-icon" style={{ marginLeft: 8 }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" strokeWidth="2" stroke="green">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            } else {
                                                // DEFAULT or other types, 2 rows (grid)
                                                return (
                                                    <div key={option.id || oidx} className="quiz-option-wrapper" style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                                                        <button
                                                            className="option"
                                                            disabled
                                                        >
                                                            {option.text}
                                                        </button>
                                                        {isCorrect && (
                                                            <span className="option-icon" style={{ marginLeft: 8 }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" strokeWidth="2" stroke="green">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report