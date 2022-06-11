import { useEffect, useState } from "react";

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
    fetch(`https://nc-marketplace-best-value.herokuapp.com/api/categories`)
      .then((res) => res.json())
      .then(({ categories }) => {
        setCategories(categories);
      });
  }, []);

  return (
    <div id="search">
      <form onSubmit={handleSumbit}>
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
        <button type="submit">Search!</button>
      </form>
    </div>
  );
};

export default Search;
