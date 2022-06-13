import React, { useState } from "react";
import { createCategory } from "../apiRequests";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CreateCategory({ setUserCooseToAddNewCategory }) {
  const [inputvalue, setInputValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const addCategory = () => {
    console.log(inputvalue);
    if (inputvalue.length) {
      createCategory(inputvalue).then((data) => {
        if (data.category) {
          setError(` ${data.category.category_name} added secssefully`);
          document.getElementById("input-category").value = "";
          navigate("/");
          navigate("/sell");
          setUserCooseToAddNewCategory(false);
        } else {
          setError("this category is already exites");
        }
      });
    } else {
      setError("Write a category name");
    }
  };

  return (
    <div id="add-new-category">
      <div className="center">
        <Form.Label htmlFor="basic-url">Add your new catoegory</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">E.g Pets.</InputGroup.Text>
          <Form.Control
            id="input-category"
            aria-describedby="basic-addon3"
            onChange={(e) => {
              setError("");
              setEmpty(false);
              setInputValue(e.target.value);
            }}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            onClick={addCategory}
          >
            Add
          </Button>
          {empty ? <p>Write Category name </p> : <></>}
          {error ? <p>{error}</p> : <></>}
        </InputGroup>
      </div>
    </div>
  );
}

export default CreateCategory;
