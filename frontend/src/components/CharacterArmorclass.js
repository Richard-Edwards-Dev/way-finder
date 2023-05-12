import React from 'react'
import CharacterProficiency from './CharacterProficiency'
import { useState } from 'react'

function CharacterArmorclass({character, onCharacterUpdate}) {
  const [armorClass, setArmorClass] = useState(character.proficiency.armorClass)
  const onAcChange = (value) => {
    const updatedCharacter = {
        ...character,
        proficiency: {
            ...character.proficiency,
            armorClass: value
        }
        
    }
    onCharacterUpdate(updatedCharacter)
  }

  const handleSelect = (value) => {
    setArmorClass(Number(value))
    onAcChange(Number(value))
  }
  return (
    <div className='armorclass'>Armor Class: {10 + character.level + character.attributes.dexterity + armorClass}
        <CharacterProficiency onSelect={handleSelect} prof={character.proficiency.armorClass}/>
    </div>
  )
}

export default CharacterArmorclass