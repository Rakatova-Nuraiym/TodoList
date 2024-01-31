import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TododList from './components/TododList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TododList/>
    </>
  )
}

export default App
