import React from 'react'
import PomodoroClock from './PomodoroClock'
import './App.css'
const App = () => {
  return (
    <div className='App'>
      <PomodoroClock cyclesLimit={1} /> 
    </div>
  )
}

export default App
