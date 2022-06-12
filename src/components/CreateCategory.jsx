import React, { useState } from "react";
import { createCategory } from "../apiRequests";

function CreateCategory() {
  const [inputvalue, setInputValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState("");

  const addCategory = () => {
    console.log(inputvalue);
    if (inputvalue.length) {
      createCategory(inputvalue).then((data) => {
        if (data.category) {
          setError(` ${data.category.category_name} added secssefully`);
          document.getElementById("input-category").value = "";
        } else {
          setError("this category is already exites");
        }
      });
    } else {
      setError("Write a category name");
    }
  };

  return (
    <div>
      <label htmlFor="input-category"></label>
      <input
        id="input-category"
        onChange={(e) => {
          setError("");
          setEmpty(false);
          setInputValue(e.target.value);
        }}
      ></input>
      <button onClick={addCategory}>add Category</button>
      {empty ? <p>Write Category name </p> : <></>}
      {error ? <p>{error}</p> : <></>}
    </div>
  );
}

export default CreateCategory;
