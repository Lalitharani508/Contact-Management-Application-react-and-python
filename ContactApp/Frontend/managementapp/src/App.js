// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import ContactForm from "./Components/contactform";
import ContactList from "./Components/contactlist";

import { getContacts } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const refresh = () => getContacts().then(res => setContacts(res.data));

  useEffect(() => { refresh(); }, []);

  return (
    <div className="container mt-4">
      <h2>Contact Management</h2>
      <ContactForm refresh={refresh} />
      <ContactList contacts={contacts} refresh={refresh} />
    </div>
  );
}

export default App;
