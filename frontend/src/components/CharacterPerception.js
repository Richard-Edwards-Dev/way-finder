import React from 'react'
import { useState } from 'react'
import CharacterProficiency from './CharacterProficiency'

function CharacterPerception({character, onCharacterUpdate}) {
    const [perception, setPerception] = useState(character.proficiency.perc)
    const onPerceptionChange = (value) => {
      const updatedCharacter = {
          ...character,
          proficiency: {
              ...character.proficiency,
              perc: value
          }
          
      }
      onCharacterUpdate(updatedCharacter)
    }
  
    const handleSelect = (value) => {
      setPerception(Number(value))
      onPerceptionChange(Number(value))
    }
    return (
      <div className='perception'>Perception: +{perception + character.attributes.wisdom + character.level}
          <CharacterProficiency onSelect={handleSelect} prof={character.proficiency.perc}/>
      </div>
    )
  }
export default CharacterPerception