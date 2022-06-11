import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllInBasket } from "../apiRequests";

const Navbar = ({ user, setUser }) => {
  let navigate = useNavigate();

  const [basket, setBasket] = useState();

  if (user) {
    // console.log(user.user.username);
    getAllInBasket(user.user.username).then((data) => {
      setBasket(data.items.length);
    });
  }
  useEffect(() => {}, [basket]);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to={`/account/${user.user.username}`}>
            {user.user.username}'s Profile
          </Link>
          <Link to="/sell">Sell an item</Link>
          <Link to="/users">Users</Link>
          <Link to={`/${user.user.username}/basket`}>
            Basket<span> {basket}</span>
          </Link>
        </>
      ) : (
        <Link to="/sign-in">Sign in</Link>
      )}
      {user ? <p onClick={logOut}> Log out </p> : <></>}
    </nav>
  );
};

export default Navbar;
