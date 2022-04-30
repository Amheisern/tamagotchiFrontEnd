import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PetType } from '../App'


export function PetDetails() {
  const history = useNavigate()
  const params = useParams<{id: string}>()
  const [petDetails, setPetDetails] = useState<PetType>({
  id:  '',
  name: '',
  birthday: '',
  hungerLevel: 0,
  happinessLevel: 0,
  lastInteractedWithDate: undefined,
  isDead: false,
  })
  
  
  
  useEffect(
    function () {
      async function getSpecificPet() {
        const response = await axios.get(
          `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
          )
          if (response.status === 200) {
            setPetDetails(response.data)
          }
        }
        getSpecificPet()}, [params.id])
        
        async function deletePet() {
          const response = await axios.delete(
            `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
          )
          if (response.status === 204) {
            history('/')
          }
        }
        console.log('petDetails', petDetails)
        console.log('params', params.id);

if (!petDetails.id) {
  return null }

  return <div>
    <h1>Pet Details</h1>
    <p>
    {params}
    </p>
    <button onClick={deletePet}>Delete</button>
  </div>
}