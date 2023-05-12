import React from 'react'
import { useState } from 'react'

function CharacterProficiency({onSelect,prof}) {
    const [profState, setProfState] = useState(prof)
    const handleSelect = (value) => {
        onSelect(value)
        setProfState(value)
    }
  return (
    <select onChange={(e)=>handleSelect(e.target.value)} className="proficiency" value={profState}>
        <option id="trained" name="proficiency" value="2" >Trained</option>
        <option id="expert" name="proficiency" value="4" >Expert</option>
        <option id="master" name="proficiency" value="6" >Master</option>                         
        <option id="legendary" name="proficiency" value="8" >Legendary</option>
                
    </select>
  )
}

export default CharacterProficiency