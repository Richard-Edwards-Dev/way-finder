import { useState } from "react"
import { useCharactersContext } from "../hooks/useCharactersContext"
import { useAuthContext } from '../hooks/useAuthContext'

const CharacterForm = () => {
  const { dispatch } = useCharactersContext()
  const { user } = useAuthContext()

  const [charName, setCharName] = useState('')
  const [ancestry, setAncestry] = useState('')
  const [background, setBackground] = useState('')
  const [charClass, setCharClass] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const character = {charName, ancestry, charClass, background}

    const response = await fetch('/api/characters', {
      method: 'POST',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setCharName('')
      setAncestry('')
      setCharClass('')
      setBackground('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CHARACTER', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create A New Character</h3>

      <label>Character Name:</label>
      <input 
        type="text"
        onChange={(e) => setCharName(e.target.value)}
        value={charName}
        className={emptyFields.includes('charName') ? 'error' : ''}
      />

      <label>Ancestry:</label>
      <input 
        type="text"
        onChange={(e) => setAncestry(e.target.value)}
        value={ancestry}
        className={emptyFields.includes('ancestry') ? 'error' : ''}
      />
      <label>Background:</label>
      <input 
        type="text"
        onChange={(e) => setBackground(e.target.value)}
        value={background}
        className={emptyFields.includes('background') ? 'error' : ''}
      />
      <label>Class:</label>
      <input 
        type="text"
        onChange={(e) => setCharClass(e.target.value)}
        value={charClass}
        className={emptyFields.includes('charClass') ? 'error' : ''}
      />

      <button>Add Character</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CharacterForm