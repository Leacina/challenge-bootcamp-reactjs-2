import React, { useState, useEfecct, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(
      response => setRepositories(response.data)
    );
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo registro: ${Date.now()}`,
      url: `www.giovane.com.br/${Date.now()}`,
      techs: [
        `React: ${Date.now()}`,
        `Node: ${Date.now()}`
      ]
    })
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const newRepositories = repositories;
    const repositorieIndex = newRepositories.findIndex(repositorie => repositorie.id === id);

    newRepositories.splice(repositorieIndex, 1);
    console.log(repositorieIndex + ' - ' +  newRepositories);
    //setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositorie => (
            <li key={repositorie.id}>
              {repositorie.title}

              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
