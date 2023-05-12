import React from 'react'
import { useState } from 'react'

function CharacterAttributes({character}) {
  const [showAttributes, setShowAttributes] = useState(false)
  const handleClick = () =>{
    setShowAttributes(!showAttributes)
  }
  return (
    <div className="attributes" onClick={handleClick}>
    { showAttributes ?  character.attributes && Object.keys(character.attributes).map((attribute) => (
      <p key={attribute}>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {character.attributes[attribute]}</p>
    )) : <h4>Attributes</h4>}

    </div>
  )
}

export default CharacterAttributes