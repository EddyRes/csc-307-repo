import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

export default function MyApp() {
  const [characters, setCharacters] = useState([]);

  // --- API helpers ---
  function fetchUsers() {
    return fetch("http://localhost:8000/users"); // GET -> { users_list: [...] }
  }

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

  // load once on mount
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((err) => console.log("GET /users failed:", err));
  }, []);

  // submit from <Form />
  function updateList(person) {
    postUser(person)
      .then(async (res) => {
        if (res.status !== 201) throw new Error(`Unexpected status ${res.status}`);
        const created = await res.json(); // { _id, name, job }
        setCharacters((prev) => [...prev, created]);
      })
      .catch((err) => console.log("POST /users failed:", err));
  }

  // delete by Mongo _id
  function removeOneCharacterById(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status !== 204) throw new Error(`Unexpected status ${res.status}`);
        setCharacters((prev) => prev.filter((c) => c._id !== id));
      })
      .catch((err) => console.log("DELETE /users/:id failed:", err));
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacterById={removeOneCharacterById}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

