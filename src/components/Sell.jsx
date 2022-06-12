import React, { useState, useEffect } from "react";
import { sellItem } from "../apiRequests";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import { useNavigate } from "react-router-dom";

function Sell() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [object, setObject] = useState({});
  const [categoryChosed, setCategoryChosed] = useState("");
  const [userCooseToAddNewCategory, setUserCooseToAddNewCategory] =
    useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (categoryChosed === "Add New Category +") {
      setUserCooseToAddNewCategory(true);
    } else {
      setUserCooseToAddNewCategory(false);
      const newObject = { ...object };
      newObject["category_name"] = categoryChosed;
      setObject(newObject);
    }
  }, [categoryChosed, setUserCooseToAddNewCategory, setObject, object]);

  const handleInputs = (userInput, inputField) => {
    const newObject = { ...object };
    newObject[inputField] = userInput;
    setObject(newObject);
  };

  const handleButton = () => {
    const itemsNumber = Object.keys(object);
    if (itemsNumber.length === 5) {
      sellItem(object).then(({ response }) => {
        navigate("/");
      });
    } else {
      setErrorMessage("you need to fill all the inputs");
    }
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
      <div>
        <label htmlFor="description">Item description:</label>
        <input
          onChange={(event) =>
            handleInputs(event.target.value, event.target.id)
          }
          id="description"
          placeholder="Your item description"
        ></input>
      </div>
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
        <label htmlFor="category_name">Chose a category :</label>
        <Category
          setCategoryChosed={setCategoryChosed}
          errorMessage={errorMessage}
        />
        {userCooseToAddNewCategory ? <CreateCategory /> : <></>}
      </div>
      <button onClick={handleButton}>Add item</button>

      {errorMessage ? <p>{errorMessage}</p> : <></>}
    </div>
  );
}

export default Sell;
