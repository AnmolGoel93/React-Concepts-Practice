import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    (async function () {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  const getUsers = async function () {
    return await fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((result) => result.data);
  };

  const onDeleteButtonClick = function (userId) {
    let usersCopy = [...users];
    usersCopy = usersCopy.filter((user) => user.id !== userId);
    setUsers(usersCopy);
  };

  if (!users) return <div>Loading.... </div>;

  return (
    <>
      <div>
        <text>Filter Users: </text>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter Users"
        />
      </div>
      <br />
      <table>
        <caption>Users-Data</caption>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (!value) return true;
              if (
                user.first_name.includes(value) ||
                user.last_name.includes(value) ||
                user.email.includes(value)
              )
                return true;
            })
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <img alt="Profile" width="50px" src={user.avatar} />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        onDeleteButtonClick(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
