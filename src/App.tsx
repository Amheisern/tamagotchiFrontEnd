import React from 'react'
import { Route, Routes } from 'react-router'
import { Landing } from './pages/Landing'

export function App() {
  return <div>
    <header>
      <h1>Tamagotchi</h1>
    </header>
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
    
     </div>
}
