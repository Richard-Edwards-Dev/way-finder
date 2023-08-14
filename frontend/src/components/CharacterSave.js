import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function CharacterSave({character}) {
  const { user } = useAuthContext()

  const handleSave = async () => {
    if (!user) {
      return
    }

    console.log(character, 'patch')
    const response = await fetch('/api/characters/' + character._id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    console.log(response)
 }

  return (
    <button onClick={handleSave}>Save Changes</button>
  )
}

export default CharacterSave