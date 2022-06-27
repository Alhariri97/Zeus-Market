import React, { useEffect, useState } from "react";
import { getAllUsers, giveKudo } from "../apiRequests";
import Loading from "./Loading";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then(({ users }) => {
      setAllUsers(users);
      setLoading(false);
    }, []);
  });
  //
  const giveUserKudo = (avatar_url, userName) => {
    const obj = {
      avatar_url: avatar_url,
      kudos_inc: 1,
    };
    giveKudo(obj, userName);
  };
  if (loading) return <Loading />;
  return (
    <div className="all-ordered">
      {allUsers.map((user) => {
        return (
          <div key={user.username}>
            <h3>{user.username}</h3>
            <img
              src={user.avatar_url}
              alt={user.username}
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXMqVH5NqxH8y8Cz5kpYbwdFszBuK_EfwRu3rfqZ8lo3Q6dKJhg5oLzixMbRWTYqyxd4&usqp=CAU";
              }}
            ></img>
            <h5>{user.kudos}</h5>
            <button
              onClick={() => giveUserKudo(user.avatar_url, user.username)}
            >
              Give Kudos
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
