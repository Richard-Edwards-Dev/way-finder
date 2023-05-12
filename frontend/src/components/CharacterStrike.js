import React from 'react'
import { useState } from 'react'
import CharacterProficiency from './CharacterProficiency'

function CharacterStrike({character, onCharacterUpdate}) {
    const [strike, setStrike] = useState(character.proficiency.strike)
    const onStrikeChange = (value) => {
      const updatedCharacter = {
          ...character,
          proficiency: {
              ...character.proficiency,
              strike: value
          }
          
      }
      onCharacterUpdate(updatedCharacter)
    }
  
    const handleSelect = (value) => {
      setStrike(Number(value))
      onStrikeChange(Number(value))
    }
    return (
      <div className='strike'>Strike: +{strike + character.level + character.attributes.strength}
          <CharacterProficiency onSelect={handleSelect} prof={character.proficiency.strike}/>
      </div>
    )
  }
export default CharacterStrike