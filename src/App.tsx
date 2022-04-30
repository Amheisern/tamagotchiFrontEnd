import React from 'react'
import { Route, Routes } from 'react-router'
import { Landing } from './pages/Landing'
import { PetDetails } from './pages/PetDetails'

export function App() {
  return <div>
    <header>
      <h1>Tamagotchi</h1>
    </header>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:Id" element={<PetDetails />} />
    </Routes>
    
     </div>
}
