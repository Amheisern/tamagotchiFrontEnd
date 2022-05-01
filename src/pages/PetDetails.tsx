import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PetType } from '../App'


export function PetDetails() {
  const history = useNavigate()
  const params = useParams<{id: string}>()
  const [petDetails, setPetDetails] = useState<PetType>
  ({
  id:  undefined!,
  name: '',
  birthday: '',
  hungerLevel: 0,
  happinessLevel: 0,
  lastInteractedWithDate: undefined,
  isDead: false,
  })
  
  useEffect(() => {
    async function fetchPetDetails() {
      const response = await axios.get(
        `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
      )
      if (response.status === 200) {
        setPetDetails(response.data)
        console.log(response.data);     
      }
    }
  fetchPetDetails()
}, [params.id],)
        async function deletePet() {
          const response = await axios.delete(
            `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
          )
          if (response.status === 204) {
            history('/')
          }
        }

// useEffect(loadPetDetails, [ params.id ])
console.log('setPetDetails', setPetDetails);
console.log(params.id);
console.log('petDetails', petDetails);


  return <div>
    <h1>Pet Details
    </h1>
    <p>
   pet id: {params.id!}
    </p>
    <p>
    name: {petDetails.name}
    </p>
    <button onClick={deletePet}>Delete Pet</button>
  </div>
}