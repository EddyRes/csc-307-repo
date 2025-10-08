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

  function removeOneCharacterById(id) {
  deleteUser(id)
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(`Unexpected status ${res.status}`);
      }
      setCharacters(characters.filter((c) => c.id !== id));
    })
    .catch((err) => {
      console.log("DELETE failed:", err);
    });
	}
	

  function updateList(person) {
  postUser(person)
    .then(async (res) => {
      if (res.status !== 201) {
        throw new Error(`Unexpected status ${res.status}`);
      }
      const created = await res.json();  // { id, name, job }
      setCharacters([...characters, created]);
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
  
  function deleteUser(id) {
  return fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
	});
  }

  



  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacterById={removeOneCharacterById}
      />
      {/* exactly as spec */}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;


