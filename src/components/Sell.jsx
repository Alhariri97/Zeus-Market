import React, { useState, useEffect } from "react";
import { sellItem } from "../apiRequests";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import { useNavigate } from "react-router-dom";
import SellItem from "./SellItem";
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
  }, [categoryChosed]);

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
    <div id="sell">
      <SellItem />
    </div>
  );
}

export default Sell;
