import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { CharactersContextProvider } from './context/CharacterContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CharactersContextProvider>
        <App />
      </CharactersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);