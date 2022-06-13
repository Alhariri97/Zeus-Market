import React, { useState, useEffect } from "react";
import { getAllCategories } from "../apiRequests.js";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
function Category({ setCategoryChosed, errorMessage }) {
  const [categoriesarray, setCategoriesarray] = useState([]);

  useEffect(() => {
    getAllCategories().then(({ categories }) => {
      setCategoriesarray(categories);
    });
  }, [errorMessage]);

  const addNewCatoegory = () => {};

  return categoriesarray.length ? (
    <Form.Group as={Col} md="6" controlId="formGridState">
      <Form.Label>Category</Form.Label>
      <Form.Select
        name="category_name"
        id="category_name"
        onChange={(e) => setCategoryChosed(e.target.value)}
        defaultValue="Choose..."
      >
        {categoriesarray.map((category) => {
          return (
            <option key={category.category_name} value={category.category_name}>
              {category.category_name}
            </option>
          );
        })}
        <option onClick={addNewCatoegory}>Add New Category +</option>
      </Form.Select>
    </Form.Group>
  ) : (
    <>none</>
  );
}
//
export default Category;
