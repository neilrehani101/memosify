import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { Link } from "react-router-dom"

export const About = () => {

  return (
    <>
      <br></br>
        <div class="row ">
        <div className="col">
        <h1>Memosify</h1>
          <p>Memosify is made with the goal of allowing you to jot your precious memories down. Know this, your data is safe with us. Nothing will ever happen to it. Your passwords, even if strong, are encrypted to keep them away from hackers. So, jot your memories down, jot them with the assurance of safety, here at Memosify.</p>
        </div>
        
        <div className="col-md-6">
          <img src="../memosify.png" class="rounded img-fluid" alt="..." />
        </div>
        <div className="col">
        <h1>About the developer</h1>
          <p>This website is made by me, Neil Rehani. I am a student in India. I love programming and know JavaScript, Python, Dart, Flutter, ReactJS, and other technologies.</p>
        </div>
      </div>
      <Link to='/'>
        <button type="button" className="btn btn-warning flotingUp">
          <i className="fa-solid fa-house"></i>
        </button>
      </Link>
    </>
  )
}
