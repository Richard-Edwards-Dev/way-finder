import React from 'react'
import CharacterProficiency from './CharacterProficiency'
import { useState } from 'react'

function CharacterSavingThrows({character, onCharacterUpdate}) {
  const [fort, setFort] = useState(character.proficiency.fort)
  const [ref, setRef] = useState(character.proficiency.ref)
  const [will, setWill] = useState(character.proficiency.will)

  const onSavingThrowChange = (fort,ref,will) => {
    const updatedCharacter = {
        ...character,
        proficiency: {
            ...character.proficiency,
            fort: +fort,
            ref: +ref,
            will: +will,
        }
        
    }
    onCharacterUpdate(updatedCharacter)
  }

  const handleFortSelect = (value) => {
    setFort(Number(value))
    onSavingThrowChange(value,ref,will)
  }
  const handleRefSelect = (value) => {
    setRef(Number(value))
    onSavingThrowChange(fort,value,will)
  }
  const handleWillSelect = (value) => {
    setWill(Number(value))
    onSavingThrowChange(fort,ref,value)
  }
  return (
    <div className='savingthrows col'>
        <div className='fortitude'>Fortitude: {10 + character.level + character.attributes.constitution + fort}<CharacterProficiency onSelect={handleFortSelect} prof={character.proficiency.fort}/></div>
        <div className='reflex'>Reflex: {10 + character.level + character.attributes.dexterity + ref}<CharacterProficiency onSelect={handleRefSelect} prof={character.proficiency.ref}/></div>
        <div className='will'>Will: {10 + character.level + character.attributes.wisdom + will}<CharacterProficiency onSelect={handleWillSelect} prof={character.proficiency.will}/></div>
    </div>
  )
}

export default CharacterSavingThrows