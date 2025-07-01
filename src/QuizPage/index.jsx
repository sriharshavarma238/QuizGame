import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import { ClipLoader } from "react-spinners";
import Results from "../Results";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);
  const [attempted, setAttempted] = useState(false);
  const [unattempted, setUnattempted] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState([]);
  const totalQuestions = questions.length;
  const question = questions[current];

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("https://apis.ccbp.in/assess/questions");
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setSelected(null);
      setCurrent((prev) => prev + 1);
      setTimer(15);
      setAttempted(false);
      setUnattempted(prev => prev + 1);
      setUnattemptedQuestions(prev => [...prev, question])
      return;
    }

    

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (attempted){
      clearInterval(countdown)
    }
    return () => clearInterval(countdown);
  }, [timer, attempted, current]);

  if (loading) {
    return (
      <div className="quiz-loading">
        <ClipLoader color="#0EA5E9" />
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="quiz-loading">No questions found.</div>;
  }

  if (current >= questions.length) {
    return (
      <Results unattempted={unattempted} totalQuestions={totalQuestions} correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} unattemptedQuestions={unattemptedQuestions} />
    );
  }

  
  const optionType = question.options_type;

  const handleOptionClick = (opt, idx) => {
    if (selected === null) {
      setSelected(idx);
      setAttempted(true);
    }
    
    if (opt.is_correct === "true") {
      setCorrectAnswers((prev) => prev + 1);
    }else{
      setWrongAnswers(prev => prev + 1);
    }
  };


  const handleNext = () => {
    setSelected(null);
    setCurrent((prev) => prev + 1);
    setTimer(15);
    setAttempted(false);
  };

  const getIcon = (opt, idx) => {
    if (selected === null) return null;
    const isSelected = selected === idx;
    const isCorrect = opt.is_correct === "true";
    const selectedIsCorrect = question.options[selected].is_correct === "true";

    if (isSelected && isCorrect) {
      // Selected and correct: show green tick
      return (
        <span className="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </span>
      );
    } else if (isSelected && !isCorrect) {
      // Selected and wrong: show red cross
      return (
        <span className="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>
      );
    } else if (!isSelected && isCorrect && !selectedIsCorrect) {
      // Not selected, but is correct, and user selected wrong: show green tick
      return (
        <span className="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="quiz-progress">
              <span className="que">Question</span>
              <br />
              <span className="queNo">
                {current + 1}/{questions.length}
              </span>
            </div>
            <div className="quiz-timer">{timer}</div>
          </div>

          <span className="quiz-question">{question.question_text}</span>

          {optionType === "SINGLE_SELECT" ? (
            <form className="quiz-options-radio">
              {question.options.map((opt, idx) => (
                <div key={opt.id || idx} className="quiz-option-wrapper">
                  <label className="quiz-option-radio-label">
                    <input
                      type="radio"
                      name={`question-${current}`}
                      value={idx}
                      checked={selected === idx}
                      onChange={() => handleOptionClick(opt, idx)}
                      className="quiz-option-radio"
                      disabled={selected !== null}
                    />
                    <span>{opt.text}</span>
                  </label>
                  {getIcon(opt, idx)}
                </div>
              ))}
            </form>
          ) : optionType === "IMAGE" ? (
            <div className="quiz-options image-options">
              {question.options.map((opt, idx) => {
                let btnClass = "quiz-option-img-btn";
                if (selected !== null) {
                  if (idx === selected) {
                    btnClass += opt.is_correct === "true" ? " correct" : " wrong";
                  } else if (
                    question.options[selected].is_correct !== "true" &&
                    opt.is_correct === "true"
                  ) {
                    btnClass += " correct";
                  }
                }
                return (
                  <div key={opt.id || idx} className="quiz-option-wrapper">
                    <button
                      onClick={() => handleOptionClick(opt, idx)}
                      className={btnClass}
                      disabled={selected !== null}
                    >
                      <img
                        src={opt.image_url}
                        alt={`option-${idx}`}
                        className="quiz-option-img"
                      />
                    </button>
                    {getIcon(opt, idx)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="quiz-options">
              {question.options.map((opt, idx) => {
                let btnClass = "quiz-option-btn";
                if (selected !== null) {
                  if (idx === selected) {
                    btnClass += opt.is_correct === "true" ? " correct" : " wrong";
                  } else if (
                    question.options[selected].is_correct !== "true" &&
                    opt.is_correct === "true"
                  ) {
                    btnClass += " correct";
                  }
                }
                return (
                  <div key={opt.id || idx} className="quiz-option-wrapper">
                    <button
                      onClick={() => handleOptionClick(opt, idx)}
                      className={btnClass}
                      disabled={selected !== null}
                    >
                      <span>{idx + 1}. {opt.text}</span>
                      
                    </button>
                    {getIcon(opt, idx)}
                  </div>
                );
              })}
            </div>
          )}
          
          <button
            onClick={handleNext}
            disabled={selected === null || timer === 0}
            className="quiz-next-btn"
          >
            {current === questions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizPage;