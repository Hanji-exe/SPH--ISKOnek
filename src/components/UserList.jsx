import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Replace with your real AWS API Gateway endpoint
    fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.userType})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList; 