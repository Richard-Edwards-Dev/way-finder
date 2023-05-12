import { useEffect }from 'react'
import { useCharactersContext } from "../hooks/useCharactersContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'

const Home = () => {
  const {characters, dispatch} = useCharactersContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('/api/characters', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CHARACTERS', payload: json})
      }
    }

    if (user) {
      fetchCharacters()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="characters">
        {characters && characters.map((character) => (
          <CharacterDetails key={character._id} character={character} />
          
        ))}
      </div>
      <CharacterForm />
    </div>
  )
}

export default Home