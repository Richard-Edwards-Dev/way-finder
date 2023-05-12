import { createContext, useReducer } from 'react'

export const CharactersContext = createContext()

export const charactersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTERS': 
      return {
        characters: action.payload
      }
    case 'CREATE_CHARACTER':
      return {
        characters: [action.payload, ...state.characters]
      }
    case 'UPDATE_CHARACTER':
      const updatedCharacter = action.payload;
      return {
        characters: state.characters.map((c) =>
          c._id === updatedCharacter._id ? updatedCharacter : c
        )
      };
    case 'DELETE_CHARACTER':
      return {
        characters: state.characters.filter((c) => c._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CharactersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(charactersReducer, {
    characters: null
  })

  return (
    <CharactersContext.Provider value={{...state, dispatch}}>
      { children }
    </CharactersContext.Provider>
  )
}