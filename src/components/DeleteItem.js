import React from "react";
import { deleteItemById } from "../apiRequests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/User";

function DeleteItem({ product_id, setLogedin }) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const deleteItem = () => {
    if (!user) {
      setLogedin(true);
    } else {
      deleteItemById(product_id);
      navigate("/");
    }
  };
  return <button onClick={deleteItem}>Remove item</button>;
}

export default DeleteItem;
