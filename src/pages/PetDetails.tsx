import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PetType } from '../App'

export function PetDetails() {
  const history = useNavigate()
  const params =
    useParams<{ id: string; actions: 'Playtimes' | 'Feedings' | 'Scoldings' }>()

  const [petDetails, setPetDetails] = useState<PetType>({
    id: undefined!,
    name: '',
    birthday: '',
    hungerLevel: 0,
    happinessLevel: 0,
    lastInteractedWithDate: undefined,
    isDead: false,
  })
  const [petHunger, setPetHunger] = useState<PetType>()
  const [petPlay, setPetPlay] = useState<PetType>()
  const [petScold, setPetScold] = useState<PetType>()

  useEffect(() => {
    async function fetchPetDetails() {
      const response = await axios.get(
        `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
      )
      if (response.status === 200) {
        setPetDetails(response.data)
        console.log(response.data)
      }
    }
    fetchPetDetails()
  }, [params.id] )
  async function deletePet() {
    const response = await axios.delete(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 200) {
      history('/')
    }
  }
  if (!petDetails.id) {
    return null
  }

  async function feedPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Feedings`
    )
    if (response.status === 200) {
      setPetHunger(response.data)
    }
  }
  async function playWithPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Playtimes`
    )
    if (response.status === 200) {
      setPetPlay(response.data)
      
    }
  }
  async function scoldPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Scoldings`
    )
    if (response.status === 200) {
      setPetScold(response.data)
    }
  }
  // useEffect(loadPetDetails, [ params.id ])
  console.log('setPetDetails', setPetDetails)
  console.log(params.id)
  console.log('petDetails', petDetails)

  return (
    <div>
      <h1>Pet Details</h1>
      <p>pet id: {params.id!}</p>
      <p>
        name: {petDetails.name}
        hunger: {petDetails.hungerLevel}
        happiness: {petDetails.happinessLevel}
      </p>
      <button onClick={deletePet}>Delete Pet</button>
      <button onClick={feedPet}>Feed pet{petHunger}</button>
      <button onClick={playWithPet}>Play with pet{petPlay}</button>
      <button onClick={scoldPet}>Scold pet{petScold}</button>
    </div>
  )
}
