import React, { useState, useEffect } from "react";
import { getAllCategories } from "../apiRequests.js";

function Category({ setCategoryChosed, errorMessage }) {
  const [categoriesarray, setCategoriesarray] = useState([]);

  useEffect(() => {
    getAllCategories().then(({ categories }) => {
      setCategoriesarray(categories);
    });
  }, [errorMessage]);

  const addNewCatoegory = () => {};
  return categoriesarray.length ? (
    <div>
      <select
        name="category_name"
        id="category_name"
        onChange={(e) => setCategoryChosed(e.target.value)}
      >
        {categoriesarray.map((category) => {
          return (
            <option key={category.category_name} value={category.category_name}>
              {category.category_name}
            </option>
          );
        })}
        <option onClick={addNewCatoegory}>Add New Category +</option>
      </select>
    </div>
  ) : (
    <>none</>
  );
}
//
export default Category;
