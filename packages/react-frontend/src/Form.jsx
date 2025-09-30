// src/Form.jsx
import React, { useState } from "react";

function Form({ handleSubmit }) {
  const [form, setForm] = useState({ name: "", job: "" });

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.job.trim()) return;
    handleSubmit({ name: form.name.trim(), job: form.job.trim() });
    setForm({ name: "", job: "" });
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="job"
          placeholder="Job"
          value={form.job}
          onChange={onChange}
        />
        <button type="submit" disabled={!form.name.trim() || !form.job.trim()}>
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;

