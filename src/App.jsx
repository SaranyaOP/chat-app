import React from 'react'
import Navlinks from './components/Navlinks'
import Chatlist from './components/Chatlist'
import Chatbox from './components/Chatbox'
import Login from './components/Login'
import Register from './components/Register'


const App = () => {
  return (
    <div className='flex lg:flex-row flex-col items-start w-[100%]'>
      <Navlinks />
      <Chatlist />
      <Chatbox />
      <div className='hidden'> 
        <Login /> 
        <Register />
      </div>
    
    </div>
  )
}

export default App