import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const MOCK_API_URL = 'https://64850950ee799e32162731ec.mockapi.io/trails';

  const [users, setUsers] = useState([{}]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserJobTitle, setNewUserJobTitle] = useState('');
  const [newUserCompanyName, setNewUserCompanyName] = useState('');

  const [updatedName, setUpdatedName] = useState('');
  const [updatedJobTitle, setUpdatedJobTitle] = useState('');
  const [updatedCompanyName, setUpdatedCompanyName] = useState('');

  function getUsers() {
    fetch(MOCK_API_URL)
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function deleteUser(id) {
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE',
    }).then(() => getUsers());
  }

  function postNewUser(e) {
    e.preventDefault();

    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newUserName,
        jobTitle: newUserJobTitle,
        companyName: newUserCompanyName,
      }),
    }).then(() => getUsers());
  }

  function updateUser(e, userObject) {
    e.preventDefault();

    let updatedUserObject = {
      ...userObject,
      name: updatedName,
      jobTitle: updatedJobTitle,
      companyName: updatedCompanyName,
    };

    fetch(`${MOCK_API_URL}/${userObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUserObject),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getUsers());
  }

  return (
    <div className="App">
      <form>
        <h3>Post a Trail Choice</h3>
        <label>Trail Name</label>
        <input onChange={(e) => setNewUserName(e.target.value)} />
        <label>Trail Difficulty</label>
        <input onChange={(e) => setNewUserJobTitle(e.target.value)} />
        <label>Location of Trail</label>
        <input onChange={(e) => setNewUserCompanyName(e.target.value)} />
        <button onClick={(e) => postNewUser(e)}>Submit</button>
      </form>

      {users.map((user, index) => (
        <div className="userContainer" key={index}>
          <div>
            Name: {user.name} <br />
            job Title: {user.jobTitle} <br />
            Company Name: {user.companyName} <br />
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
          <form>
            <h3>Update This User</h3>
            <label>Update Name</label>
            <input onChange={(e) => setUpdatedName(e.target.value)} />
            <br />

            <label>Update Job Title</label>
            <input onChange={(e) => setUpdatedJobTitle(e.target.value)} />
            <br />

            <label>Update Company Name</label>
            <input onChange={(e) => setUpdatedCompanyName(e.target.value)} />
            <br />
            <button onClick={(e) => updateUser(e, user)}>Update</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
