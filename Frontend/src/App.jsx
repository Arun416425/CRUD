import { useState } from 'react'
import './App.css'
import Crud from './components/Crud'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Crud />
    </>
  )
}

export default App
