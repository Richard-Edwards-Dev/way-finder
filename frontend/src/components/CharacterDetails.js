import { useCharactersContext } from '../hooks/useCharactersContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'


const CharacterDetails = ({ character }) => {
  const { dispatch } = useCharactersContext()
  const { user } = useAuthContext()
  console.log(character)


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/characters/' + character._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CHARACTER', payload: json})
    }
  }


  return (
    
    <div className="character-details" >
      <Link to={ `/characterSheet/${character._id}`} style={{ textDecoration: 'none' }} >
      <h4 >{character.charName}</h4>
      <p><strong>Ancestry: </strong>{character.ancestry}</p>
      <p><strong>Background: </strong>{character.background}</p>
      <p><strong>Class: </strong>{character.charClass}</p>
      <p>{formatDistanceToNow(new Date(character.createdAt), { addSuffix: true })}</p>
      </Link>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    

  )
}

export default CharacterDetails