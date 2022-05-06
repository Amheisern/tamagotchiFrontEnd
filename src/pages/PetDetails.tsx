import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PetType } from '../App'
import image1 from '../images/bunny.svg'

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
  const [petHunger, setPetHunger] = useState<number>()
  const [petPlay, setPetPlay] = useState<number>()
  const [petScold, setPetScold] = useState<number>()


  useEffect(() => {
    async function fetchPetDetails() {
      const response = await axios.get(
        `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
      )
      if (response.status === 200) {
        setPetDetails(response.data)
        // console.log(response.data)
      }
    }
    fetchPetDetails()
  }, [params.id])

  async function deletePet() {
    const response = await axios.delete(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 200) {
      history('/')
    }
  }
  async function updatePetLevels() {
    const response = await axios.get(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 200) {
      setPetDetails(response.data)
      setPetHunger(response.data.hungerLevel)
      setPetPlay(response.data.happinessLevel)
      setPetScold(response.data.happinessLevel)
    }
  }

  // useEffect(updatePetLevels, [petHunger, petPlay, petScold])

  async function feedPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Feedings`
    )
    if (response.status === 200) {
      setPetHunger(response.data.hungerLevel)
      updatePetLevels()
    }
  }
  async function playWithPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Playtimes`
    )
    if (response.status === 200) {
      setPetPlay(response.data.happinessLevel)
      updatePetLevels()
    }
  }
  async function scoldPet() {
    const response = await axios.post(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}/Scoldings`
    )
    if (response.status === 200) {
      setPetScold(response.data.happinessLevel)
      updatePetLevels()
    }
  }
  //bad way to get rid of errors will fix later. 
  console.log(petHunger)
  console.log(petPlay)
  console.log(petScold)

  if (!petDetails.id) {
    return null
  }

  return (
    <div>
      <h2>Pet Details</h2>
      <div>
        <img src={image1} alt="pet" />
      </div>
      <p>pet id: {params.id!}</p>
      <p>name: {petDetails.name}</p>
      <p>hunger: {petDetails.hungerLevel}</p>
      <p>happiness: {petDetails.happinessLevel}</p>

      <button onClick={deletePet}>Delete Pet</button>
      <button onClick={feedPet}>Feed pet</button>
      <button onClick={playWithPet}>Play with pet</button>
      <button onClick={scoldPet}>Scold pet</button>
    </div>
  )
}
