import { useEffect, useState } from "react";
import { getAllCategories } from "../apiRequests.js";
import Form from "react-bootstrap/Form";

const Search = ({ setSearchValue, setCategory }) => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [categoryBarValue, setCategoryBarValue] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSumbit = (event) => {
    event.preventDefault();
    setSearchValue(searchBarValue);
    setCategory(categoryBarValue);
  };

  useEffect(() => {
    getAllCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Form onSubmit={handleSumbit} className="d-flex">
      <label htmlFor="filter">
        Filter by:
        <select
          name="category_name"
          id="filter"
          onChange={(event) =>
            setCategoryBarValue(`${event.target.name}=${event.target.value}`)
          }
        >
          {categories.map((category) => {
            return (
              <option
                key={category.category_name}
                value={category.category_name}
              >
                {category.category_name}
              </option>
            );
          })}
        </select>
      </label>
      <input
        id="search-bar"
        onChange={(event) => setSearchBarValue(event.target.value)}
      ></input>
      <button variant="outline-success" type="submit">
        Search!
      </button>
    </Form>
  );
};

export default Search;
