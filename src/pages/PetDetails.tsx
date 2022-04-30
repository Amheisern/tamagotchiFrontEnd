import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router'


export function PetDetails() {
  const history = useNavigate()
  const params = useParams<{id: string}>()

  async function deletePet() {
    const response = await axios.delete(
      `https://lodashtamagotchi.herokuapp.com/api/Pets/${params.id}`
    )
    if (response.status === 204) {
      history('/')
    }
  }
  return <div>
    <h1>Pet Details</h1>
    <p>
      Pet ID:
      {params.name}
    </p>
    <button onClick={deletePet}>Delete</button>
  </div>
}