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
    setCharacters(characters.filter((_, i) => i !== index));
  }

  // exactly as spec
  function updateList(person) {
    setCharacters([...characters, person]);
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

