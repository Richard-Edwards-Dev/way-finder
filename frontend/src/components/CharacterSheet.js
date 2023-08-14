import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import CharacterAttributes from './CharacterAttributes'
import CharacterArmorclass from './CharacterArmorclass'
import CharacterSavingThrows from './CharacterSavingThrows'
import CharacterLevel from './CharacterLevel'
import CharacterSave from './CharacterSave'
import CharacterStrike from './CharacterStrike'
import CharacterPerception from './CharacterPerception'
import CharacterInventory from './CharacterInventory'

function CharacterSheet() {

    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch('/api/characters/' + id, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      if (response.ok) {
        setCharacter(json)
      }
    }

    if (user) {
      fetchCharacter()
    }
  }, [ user, id])

  if (character === null) {
    return <div>Loading...</div>;
  }

  const updateCharacter = (updatedCharacter) => {
    setCharacter(updatedCharacter)
  }

  return (
    <div className='character-details'>
        <div className="info row text-center d-flex align-items-center">
            <h2 className="name col-6 text-center">{character.charName}</h2>
            <div className="details col-3 d-flex justify-content-center">
                <div className='align-self-center'>
                <p className='mb-3'>Ancestry: {character.ancestry} </p>
                <p className='mb-3'>Background: {character.background}</p> 
                <p className='mb-3'>Class: {character.charClass}</p> 
                </div>
            </div>
            <CharacterLevel onCharacterUpdate={updateCharacter} character={character}/>
        </div>
        <div className="statistics row text-center">
            <div className="attributes col"><CharacterAttributes character={character}/></div>
            <div className="armorclass col row">
                <CharacterArmorclass onCharacterUpdate={updateCharacter} character={character}/>
            </div>
            <CharacterSavingThrows onCharacterUpdate={updateCharacter} character={character}/>
            <div className="perception col"> <CharacterPerception onCharacterUpdate={updateCharacter} character={character}/> </div>
        </div>
        <div className="actions row text-center">
            <div className="strikes col"><CharacterStrike onCharacterUpdate={updateCharacter} character={character}/></div>
            <div className="skills col"><CharacterInventory character={character} onCharacterUpdate={updateCharacter}/></div>
        </div>
        <div className='text-center'>
          <CharacterSave character={character}/>
        </div>
    </div>
  )
}

export default CharacterSheet