import React from 'react'
import { useState } from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function CharacterLevel ({character, onCharacterUpdate}) {
  const [level, setLevel] = useState(character.level)

  const handleChangeLevel = (newLevel) => {
    const updatedCharacter = {
        ...character,
        level: newLevel || 1
    }
    
    onCharacterUpdate(updatedCharacter)

  }

  const handleClick = (value) =>{
    handleChangeLevel(level + value)
    setLevel(level+value)
  }

  return (
    <div className='level col-3 d-flex align-items-center'>
        <h3 className='m-3'>Level {level}</h3>
        <FaArrowUp onClick={()=>handleClick(1)}/>
        <FaArrowDown onClick={()=>handleClick(-1)}/> 
    </div>
  )
}

export default CharacterLevel