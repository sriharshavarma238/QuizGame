import React, { use, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = () => {
    setShowErrorMsg(true)
    setErrorMsg("Please enter valid username and password")
  }

  const submitFormSuccess = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure()
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-content">
          <div className="login-logo">
            <span className="logo-q">Q</span>
          </div>
          <div className="login-title">NXT Quiz</div>
          <form className="login-form" onSubmit={submitFormSuccess}>
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              className="login-input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
            />

            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            />

            <div className="login-checkbox-row">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="show-password-checkbox"
              />
              <label htmlFor="showPassword" className="show-password-label">
                Show Password
              </label>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
            {showErrorMsg && (
              <p className="error-message">Please Enter a Valid Username and Password.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
