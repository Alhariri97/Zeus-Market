import React, { useState } from "react";
import { sellItem, createCategory } from "../apiRequests";
import { useNavigate } from "react-router-dom";

function Sell() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [object, setObject] = useState({});
  let navigate = useNavigate();

  const handleInputs = (userInput, inputField) => {
    const newObject = { ...object };
    newObject[inputField] = userInput;
    setObject(newObject);
  };

  const handleButton = () => {
    const itemsNumber = Object.keys(object);
    if (itemsNumber.length === 5) {
      sellItem(object).then((res) => {
        if (res.msg) {
          if (res.msg === "category not found") {
            createNewCategory(object.category_name);
          } else {
            setErrorMessage(res.msg);
          }
        } else {
          navigate("/");
        }
      });
    } else {
      setErrorMessage("you need to fill all the inputs");
    }
  };

  const createNewCategory = (categoryName) => {
    createCategory(categoryName);
    handleButton();
  };

  return (
    <div>
      <h3>List an item </h3>
      <div>
        <label htmlFor="item_name">Item name:</label>
        <input
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          id="item_name"
          placeholder="Your item name"
        ></input>
      </div>
      <label htmlFor="description">Item description:</label>
      <input
        onChange={(event) => handleInputs(event.target.value, event.target.id)}
        id="description"
        placeholder="Your item description"
      ></input>{" "}
      <div></div>
      <div>
        <label
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          htmlFor="img_url"
        >
          Item image url:
        </label>
        <input
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          id="img_url"
          placeholder="Your item image url"
        ></input>{" "}
      </div>
      <div>
        <label htmlFor="price">Item price:</label>
        <input
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          id="price"
          placeholder="Your item price"
        ></input>{" "}
      </div>
      <div>
        <label htmlFor="category_name">Item category name:</label>
        <input
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          id="category_name"
          placeholder="Your item category name"
        ></input>
      </div>
      <button onClick={handleButton}>Add item</button>
      {errorMessage ? <p>{errorMessage}</p> : <></>}
    </div>
  );
}

export default Sell;
