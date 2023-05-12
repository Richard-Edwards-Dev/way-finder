import React from 'react'
import { useState } from 'react'
import { useCharactersContext } from '../hooks/useCharactersContext'


function CharacterBackground({character}) {
  const [background, setBackground] = useState(character.background)

  const {dispatch} = useCharactersContext()
  const onBackgroundChange = async (value) => {
    setBackground(value)
    const updatedCharacter = {
        ...character,
        background: value
    }
    const json = JSON.stringify(updatedCharacter)
    console.log(json)
    dispatch({ type: 'UPDATE_CHARACTER', payload: json })

  }

  return (
    <input 
    value={background}
    onChange={(e) => {onBackgroundChange(e.target.value)}}
    />
  )
}

export default CharacterBackground