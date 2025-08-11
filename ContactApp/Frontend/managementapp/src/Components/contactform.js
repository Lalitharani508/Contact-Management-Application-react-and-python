import React, { useState } from "react";
import { addContact } from "../api";

export default function ContactForm({ refresh }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", address: "", email: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addContact(form);
    refresh();
    setForm({ first_name: "", last_name: "", address: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      {Object.keys(form).map((key) => (
        <input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={key.replace("_", " ")} className="form-control mb-2" required />
      ))}
      <button className="btn btn-primary">Add Contact</button>
    </form>
  );
}
