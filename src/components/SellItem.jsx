import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
//
import React, { useState, useEffect } from "react";
import { sellItem } from "../apiRequests";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import { useNavigate } from "react-router-dom";

function SellItem() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  //

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

  const handleButton = (e) => {
    e.preventDefault();
    const itemsNumber = Object.keys(object);
    if (itemsNumber.length === 5) {
      sellItem(object).then(({ response }) => {
        navigate("/");
      });
    } else {
      setErrorMessage("you need to fill all the inputs");
    }
  };

  //

  return (
    <div id="form-container">
      {userCooseToAddNewCategory ? (
        <CreateCategory
          setUserCooseToAddNewCategory={setUserCooseToAddNewCategory}
        />
      ) : (
        <></>
      )}

      <Form
        id="sell-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h3>List an item </h3>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="item_name">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              onChange={(event) =>
                handleInputs(event.target.value, event.target.id)
              }
              required
              type="text"
              placeholder="Product name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="price">
            <Form.Label>Product price </Form.Label>
            <Form.Control
              onChange={(event) =>
                handleInputs(event.target.value, event.target.id)
              }
              required
              type="text"
              placeholder="Product name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              onChange={(event) =>
                handleInputs(event.target.value, event.target.id)
              }
            />
            <Form.Control.Feedback type="invalid">
              Please a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="img_url">
            <Form.Label>image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="image URL"
              required
              onChange={(event) =>
                handleInputs(event.target.value, event.target.id)
              }
            />
            <Form.Control.Feedback type="invalid">
              Please an image URL.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          {/* <Form.Group as={Col} md="6" controlId="formGridState">
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
          </Form.Select>
          <Category
            setCategoryChosed={setCategoryChosed}
            errorMessage={errorMessage}
          />
          {userCooseToAddNewCategory ? <CreateCategory /> : <></>}
        </Form.Group> */}
          <Category
            setCategoryChosed={setCategoryChosed}
            errorMessage={errorMessage}
          />
        </Row>
        <Button onClick={(e) => handleButton(e)} type="submit">
          List
        </Button>
        {errorMessage ? <p>{errorMessage}</p> : <></>}
      </Form>
    </div>
  );
}

export default SellItem;
