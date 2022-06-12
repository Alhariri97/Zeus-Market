import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllInBasket, deleteItemFromBasket } from "../apiRequests";
import ShouldCollapse from "./Navbar";

function Basket({ setBasketLenth }) {
  const { username } = useParams();
  const [basket, setBasket] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotla] = useState(0);
  useEffect(() => {
    getAllInBasket(username).then((data) => {
      setBasket(data.items);
      setLoading(false);
      let all = data.items
        .map((e) => e.price)
        .reduce((acc, cur) => acc + cur, 0);
      setTotla(all);
    });
  }, [username, basket]);
  const deleteItme = (item_id) => {
    deleteItemFromBasket(username, item_id);
    console.log(basket);

    setBasketLenth(basket.length - 1);
    console.log(basket);
  };
  return (
    <div id="basket">
      {loading ? (
        <h3>Loading....</h3>
      ) : !basket.length ? (
        <h2>Your cart is Empty</h2>
      ) : (
        <div>
          {basket.map((e) => {
            return (
              <div key={e.item_id}>
                <img src={e.img_url} alt={e.name}></img>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
                <p>£{e.price}</p>
                <button id={e.item_id} onClick={(e) => deleteItme(e.target.id)}>
                  Delete
                </button>
              </div>
            );
          })}
          <br></br>
          <h3>Totol : £{total}</h3>
          <button>Check Out Now</button>
        </div>
      )}
      <ShouldCollapse />
    </div>
  );
}

export default Basket;
