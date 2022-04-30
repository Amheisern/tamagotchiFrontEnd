import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { PetDetails } from './pages/PetDetails'

export type PetType = {
  id: string
  name: string
  birthday: string
  hungerLevel: number
  happinessLevel: number
  lastInteractedWithDate: string| undefined
  isDead: boolean
}

export function App() {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>Tamagotchi</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Pets/:Id" element={<PetDetails />} />
      </Routes>
    </div>
  )
}
