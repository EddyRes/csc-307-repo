// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Job</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

function TableBody({ characterData, removeCharacterById }) {
  const rows = characterData.map((row) => (
    <tr key={row._id}>
      <td>{row._id}</td>
      <td>{row.name}</td>
      <td>{row.job}</td>
      <td>
        <button onClick={() => removeCharacterById(row._id)}>Delete</button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

export default function Table({ characterData, removeCharacterById }) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={characterData}
        removeCharacterById={removeCharacterById}
      />
    </table>
  );
}

