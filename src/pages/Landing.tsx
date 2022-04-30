import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PetType } from '../App'

export function Landing() {
  const [petList, setPetList] = useState<PetType[]>([])

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
  // async function fetchPets() {
  //   const response = await fetch(
  //     'https://lodashtamagotchi.herokuapp.com/api/Pets'
  //   )
  //   if (response.ok) {
  //     const {data} = await response.json()
  //     setPetList(data)
  //     console.log('pets', data)
  //   }
  // }
  fetchPets()
}
useEffect(loadAllPets, [])
console.log('loadAllPets', loadAllPets)
console.log('setPetList', setPetList)

{/* <li>{pet.name}</li>
<li>{pet.birthday}</li>
<li>{pet.hungerLevel}</li>
<li>{pet.happinessLevel}</li> */}
  return (
    <>
      <div>
        <h1>List of Pets</h1>
        <h2>
          {petList.map(function (pet) {
            return (
            <>
              <li>{pet.name}</li>
            </>
            )
          })}
        </h2>
        <ul>
          {petList.length}
        </ul>
      </div>
    </>
  )
}
