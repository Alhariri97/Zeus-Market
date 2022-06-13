import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllInBasket, getAllCategories } from "../apiRequests";

//
import Fade from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

function MainNavBar({ user, setUser, setSearchValue, setCategory }) {
  let navigate = useNavigate();

  const [basket, setBasket] = useState();
  if (user) {
    getAllInBasket(user.user.username).then((data) => {
      setBasket(data.items.length);
    });
  }

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toCollsaps();
  };
  //
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
  }, [categoryBarValue, searchBarValue]);
  const [open, setOpen] = useState(false);

  const toCollsaps = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 992) {
      setOpen(!open);
    }
  };
  return (
    <Navbar bg="light" expand="lg" id="nav-bar">
      <Container id="container" fluid>
        <h1 onClick={() => navigate("/")} className="branding">
          Zeus
        </h1>
        {/* {basket ? (
          <h5
            id="cart-icon"
            onClick={() => navigate(`/${user.user.username}/basket`)}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <spam>{basket}</spam>
          </h5>
        ) : (
          <></>
        )} */}
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <button
          id="collapse-but"
          onClick={() => {
            setOpen(!open);
          }}
          aria-controls="colaps"
          aria-expanded={open}
        >
          press{" "}
        </button>
        <Fade in={open}>
          <div id="colaps">
            <Nav
              className="me-auto my-2 my-lg-0 mb-4 "
              style={{ maxHeight: "170px" }}
              // navbarScroll
            >
              <Link
                to="/"
                className="link mx-auto"
                onClick={() => toCollsaps()}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to={`/account/${user.user.username}`}
                    className="link mx-auto"
                    onClick={() => toCollsaps()}
                  >
                    Account {user.user.username}
                  </Link>
                  <Link
                    to="sell"
                    variant="m-3"
                    className=" link mx-auto"
                    onClick={() => toCollsaps()}
                  >
                    Sell
                  </Link>
                  <Link
                    to="users"
                    className=" link mx-auto"
                    onClick={() => toCollsaps()}
                  >
                    Users
                  </Link>
                  <Link
                    to={`/${user.user.username}/basket`}
                    className=" link mx-auto"
                    onClick={() => toCollsaps()}
                  >
                    Basket <Badge bg="primary">{basket}</Badge>
                  </Link>
                </>
              ) : (
                <Link
                  to={`/sign-in`}
                  className=" link mx-auto"
                  onClick={() => toCollsaps()}
                >
                  Sing in
                </Link>
              )}
              {user ? (
                <Link to="/" onClick={logOut} className="link mx-auto">
                  Log out
                </Link>
              ) : (
                <></>
              )}
            </Nav>
            <Form onSubmit={handleSumbit} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                id="search-bar"
                onChange={(event) => setSearchBarValue(event.target.value)}
              />
              <NavDropdown
                name="category_name"
                onClick={(event) => {
                  document.getElementById(
                    "dropdown-menu-align-responsive-1"
                  ).innerText = event.target.innerHTML;
                  setCategoryBarValue(
                    `category_name=${event.target.innerHTML}`
                  );
                }}
                id="dropdown-menu-align-responsive-1"
                title="Category"
              >
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      key={category.category_name}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </Dropdown.Item>
                  );
                })}
              </NavDropdown>
              <Button
                variant="outline-success"
                type="submit"
                onClick={() => toCollsaps()}
              >
                Search
              </Button>
            </Form>
          </div>
        </Fade>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
