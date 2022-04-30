import React from 'react'
import { useParams } from 'react-router'

export function PetDetails() {
  const params = useParams<{id: number}>()
  return <div>
    <h1>Pet Details</h1>
    <p>
      Pet ID: {params.id}
      {params.name}
    </p>
  </div>
}