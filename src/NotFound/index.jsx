import React from 'react'
import './index.css'

function NotFOund() {
  return (
    <div className='not-found-container'>
        <img src='https://res.cloudinary.com/dmurwxefk/image/upload/v1751296233/Group_7504_lw9474.png' className='not-found-image' />
          <h2 style={{ color:"#334155"}}>Page Not Found</h2>
          <span style={{ color: "#64748B" }}>We are sorry, the page you requested could not be found</span>
    </div>
  )
}

export default NotFOund
