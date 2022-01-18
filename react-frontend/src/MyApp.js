import React, { useState, useEffect } from 'react';
import Table from './Table'
import Form from './Form';
import axios from 'axios';



function MyApp() {
  const [characters, setCharacters] = useState([]);
  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/users', person);
      //console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
  async function makeDelete(id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/'+id);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
  function removeOneCharacter(index,id) {
    makeDelete(id).then(result => {
      if (result && result.status === 204)
      {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
      else
        console.log('uh oh');
    });
  }
  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201)
      {
        person.id = result.data.id;
        //console.log(person);
        //characters.push(person);
        setCharacters([...characters, person]);
      }
    });
    //setCharacters(characters);
  }
  useEffect(() => {
    fetchAll().then(result => {
      if (result)
        setCharacters(result);
    });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;

