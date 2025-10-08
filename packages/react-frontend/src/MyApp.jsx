import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring actress" },
    { name: "Dennis", job: "Bartender" }
  ]);

  function removeOneCharacter(index) {
    setCharacters(characters.filter((_, i) => i !== index));
  }
  
  function updateList(person) {
    postUser(person)
      .then(() => {
        setCharacters([...characters, person]);
      })
      .catch((err) => {
        console.log("POST /users failed:", err);
      });
  }

  function fetchUsers() {
  return fetch("http://localhost:8000/users"); // returns a Promise
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((err) => console.log(err));
  }, []);

  function postUser(person) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
  }
  function postUser(person) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
  }



  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      {/* exactly as spec */}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

