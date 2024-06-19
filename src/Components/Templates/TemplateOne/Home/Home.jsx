import React from 'react'
import "./Home.css"
const Home = ({username,desc}) => {

  return (
    <div className='home-container'>
      <h2>Hi there</h2>
      <h3>I am {username}</h3>
      <h3>{desc}</h3>
    </div>
  )
}

export default Home
