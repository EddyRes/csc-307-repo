// src/MyApp.jsx
import React, { useState } from "react";
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
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
  }

  function addCharacter(character) {
	setCharacters(prev => [...prev, character]);
}

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
	<Form handleSubmit={addCharacter} />
    </div>
  );
}

export default MyApp;

