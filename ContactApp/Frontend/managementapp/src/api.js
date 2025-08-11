import axios from "axios";

// const API_URL = "http://127.0.0.1:5000";
const API_URL = "http://127.0.0.1:8000";



export const getContacts = () => axios.get(`${API_URL}/contacts`);
export const addContact = (data) => axios.post(`${API_URL}/contacts`, data);
export const updateContact = (email, data) => axios.put(`${API_URL}/contacts/${email}`, data);
export const deleteContact = (email) => axios.delete(`${API_URL}/contacts/${email}`);
