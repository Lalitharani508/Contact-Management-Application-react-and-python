from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List
import sqlite3
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change ["*"] to ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
conn = sqlite3.connect("contacts.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    address TEXT,
    email TEXT UNIQUE,
    phone TEXT
)
""")
conn.commit()

# Schema
class Contact(BaseModel):
    first_name: str
    last_name: str
    address: str
    email: EmailStr
    phone: str

@app.get("/contacts", response_model=List[Contact])
def get_contacts():
    cursor.execute("SELECT first_name, last_name, address, email, phone FROM contacts")
    rows = cursor.fetchall()
    return [Contact(first_name=r[0], last_name=r[1], address=r[2], email=r[3], phone=r[4]) for r in rows]

@app.post("/contacts")
def create_contact(contact: Contact):
    try:
        cursor.execute("INSERT INTO contacts (first_name, last_name, address, email, phone) VALUES (?, ?, ?, ?, ?)",
                       (contact.first_name, contact.last_name, contact.address, contact.email, contact.phone))
        conn.commit()
        return {"message": "Contact created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")

@app.put("/contacts/{email}")
def update_contact(email: str, contact: Contact):
    cursor.execute(
        "UPDATE contacts SET first_name=?, last_name=?, address=?, phone=? WHERE email=?",
        (contact.first_name, contact.last_name, contact.address, contact.phone, email)
    )
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact updated successfully"}


@app.delete("/contacts/{email}")
def delete_contact(email: str):
    cursor.execute("DELETE FROM contacts WHERE email=?", (email,))
    conn.commit()
    return {"message": "Contact deleted successfully"}
