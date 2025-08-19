import React from "react";
import { deleteContact } from "../api";
import { updateContact } from "../api";

export default function ContactList({ contacts, refresh }) {
  return (
    <div className="mt-3">
      <h4>Contacts</h4>
      <ul className="list-group">
        {contacts.map((c, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between">
            {c.first_name} {c.last_name} - {c.email} -{c.phone}
            <button className="btn btn-danger btn-sm" onClick={() => { deleteContact(c.email).then(refresh); }}>Delete</button>
            <button className="btn btn-danger btn-sm" onClick={() => { updateContact(c.email).then(refresh); }}>Update</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
