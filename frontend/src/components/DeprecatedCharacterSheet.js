import React from 'react'
import { useParams } from 'react-router-dom'
import { useCharactersContext } from '../hooks/useCharactersContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'
import CharacterInventory from './CharacterInventory'
import CharacterFeats from './CharacterFeats'
import CharacterSave from './CharacterSave'
import CharacterBackground from './CharacterBackground'
import CharacterLevel from './CharacterLevel'


function CharacterSheet({character}) {
  const { dispatch } = useCharactersContext()
  const { user } = useAuthContext()
  const { id } = useParams()
  // const [character, setCharacter] = useState(null)
  


  //   useEffect(() => {
  //   const fetchCharacter = async () => {
  //     const response = await fetch('/api/characters' + id, {
  //       headers: {'Authorization': `Bearer ${user.token}`},
  //     })
  //     const json = await response.json()
  //     console.log(json)

  //     if (response.ok) {
  //       setCharacter(json)
  //     }
  //   }

  //   if (user) {
  //     fetchCharacter()
  //   }
  // }, [dispatch, user])
  
  const [inventory, setInventory] = useState(character.inventory)
  const [feats, setFeats] = useState(character.feats)

    // const json = await response.json()

    // if (response.ok) {
    //   dispatch({ type: 'UPDATE_CHARACTER', payload: json })
    // }

  const handleFeatChange = (index, value) => {
    const newFeats = [...feats];
    newFeats[index] = value;
    setFeats(newFeats);
    console.log(newFeats, feats)

    // Add a new field when the last field is filled
    if (index === newFeats.length - 1 && value !== "") {
      newFeats.push("");
      setFeats(newFeats);
    }
  }

  const handleInventoryChange = (index, value) => {
    const newInventory = [...inventory];
    newInventory[index] = value;
    setInventory(newInventory);

    // Add a new field when the last field is filled
    if (index === newInventory.length - 1 && value !== "") {
      newInventory.push("");
      setInventory(newInventory);
    }
  }

  return (
    <div className='character-sheet'>
      <div className='info row text-center'>
        <div className='col-6'><h2>{character.charName}</h2></div>
        <div className='col-3'>
          <p>Ancestry: {character.ancestry}</p>
          <p>Background: {character.background}</p>
          <p>Class: {character.charClass}</p>
        </div>
        <div className='col-3'>
          <CharacterLevel character={character} />
        </div>

      </div>

      
            
      <div className="attributes">
        {character.attributes && Object.keys(character.attributes).map((attribute) => (
          <p key={attribute}>{attribute}: {character.attributes[attribute]}</p>
        ))}

      </div>
      <CharacterFeats feats={feats} onFeatsChange={handleFeatChange} />
      <CharacterInventory onInventoryChange={handleInventoryChange} inventory={inventory} />
      <CharacterSave character={character} />
    </div>
  )

}


export default CharacterSheet