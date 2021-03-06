import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import {
  getAllOrdered,
  getUserByUsername,
  requestChangePhoto,
} from "../apiRequests";

function Account() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState();
  const [changePhoto, setChagePhoto] = useState(false);
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
  const clickedToChange = () => {
    setChagePhoto(true);
  };

  const cancelChange = () => {
    const img = document.getElementById("personal-img");
    img.src = user.avatar_url;
    setChagePhoto(false);
  };
  const seePreview = (url) => {
    const img = document.getElementById("personal-img");
    img.src = url;
  };
  const sendRequesToChange = () => {
    const newImgUrl = document.getElementById("new-url");
    requestChangePhoto(user.username, newImgUrl.value);
    const currentImg = document.getElementById("personal-img");
    currentImg.src = newImgUrl.value;
    setChagePhoto(false);
  };
  return (
    <main id="user">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="profile">
          <Image
            id="personal-img"
            alt={user.username}
            src={user.avatar_url}
            className="rounded"
          ></Image>
          <h3>{user.username}</h3>
          <button onClick={clickedToChange}>Change Photo</button>

          {changePhoto ? (
            <>
              <p>Enter Your new photo url here</p>
              <input
                id="new-url"
                onChange={(e) => seePreview(e.target.value)}
              ></input>{" "}
              <button onClick={cancelChange}>Cancel</button>
              <button onClick={sendRequesToChange}>Save</button>
            </>
          ) : (
            <></>
          )}
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
          <div className="all-ordered">
            {ordered.map((e) => {
              return (
                <div key={e.item_id}>
                  <h6>{e.item_name}</h6>
                  <img alt={`${e.item_name}`} src={e.img_url}></img>
                  <p>{e.description}</p>
                  <p>
                    {e.category_name} <p>??{e.price}</p>
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
