import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAllOrdered, getUserByUsername } from "../apiRequests";

function Account() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUserByUsername(username)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((err) => {});
    setLoading(false);
  }, [user, username]);
  const goToBasket = () => {
    navigate(`/${user.username}/basket`);
  };
  const goToallOrderd = () => {
    setLoading(true);
    getAllOrdered(username).then((basket) => setOrdered(basket.items));

    setLoading(false);
  };
  return (
    <main id="user">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <img alt={user.username} src={user.avatar_url}></img>
          <h3>{user.username}</h3>
          {user.items_in_basket ? (
            <p>
              you have <span>{user.items_in_basket}</span> items in your basket
            </p>
          ) : (
            <p>you dont have any items</p>
          )}
          <button onClick={goToBasket}>Show your basket</button>
          {user.items_ordered ? (
            <>
              {" "}
              <p>Items have Orderd: {user.items_ordered}</p>
              <button onClick={goToallOrderd}>See all orderd</button>
            </>
          ) : (
            <p>You havent ordered any</p>
          )}
        </div>
      )}
      <div>
        {ordered ? (
          <div>
            {ordered.map((e) => {
              return (
                <div key={e.item_id}>
                  <h3>{e.item_name}</h3>
                  <img alt={`${e.item_name}`} src={e.img_url}></img>
                  <p>{e.description}</p>
                  <p>
                    {e.category_name} <p>£{e.price}</p>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

export default Account;
