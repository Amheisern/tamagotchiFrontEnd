import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PetType } from '../App'

export function Landing() {
  const [petList, setPetList] = useState<PetType[]>([])
  const [newPetName, setNewPetName] = useState('')

  function loadAllPets() {
    async function fetchPets() {
      const response = await axios.get(
        'https://lodashtamagotchi.herokuapp.com/api/Pets'
      )
      if (response.status === 200) {
        setPetList(response.data)
        console.log(response.data);
        
      }
    }
  fetchPets()
}
async function handleCreateNewPet() {
  const response = await axios.post(
    'https://lodashtamagotchi.herokuapp.com/api/Pets',
    {   name: newPetName  }
  )
  if (response.status === 201) {
    loadAllPets()
  }
}
useEffect(loadAllPets, [])
console.log('loadAllPets', loadAllPets)
console.log('setPetList', setPetList)

  return (
    <>
      <div>
        <h1>List of Pets</h1>
        <h2>
          {petList.map(function (pet) {
            return (
            <>
            <Link to={`./Pets/${pet.id}`}><li>{pet.name}</li></Link>
              <ul>
              <li>{pet.birthday}</li>
              <li>{pet.hungerLevel}</li>
              <li>{pet.happinessLevel}</li>
           </ul> 
           </>
            )
          })}
        </h2>
        <form
          onSubmit={function (event) {
            event.preventDefault()
            handleCreateNewPet()
          }}>
          <input
            type="text"
            placeholder="Want to add a pet?"
            value={newPetName}
            onChange={function (event) {
              setNewPetName(event.target.value)
            }} />
        </form>
      </div>
    </>
  )
}
