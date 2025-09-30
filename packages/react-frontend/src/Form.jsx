import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({ name: "", job: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setPerson(prev => ({ ...prev, [name]: value }));
  }

  // exactly as spec
  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  return (
    <div style={{ marginTop: 16 }}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job" style={{ marginLeft: 8 }}>Job</label>
      <input
        id="job"
        name="job"
        value={person.job}
        onChange={handleChange}
        style={{ marginLeft: 8 }}
      />
      {/* exactly as spec: onClick, not onSubmit */}
      <input
        type="button"
        value="Submit"
        onClick={submitForm}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
}

export default Form;

