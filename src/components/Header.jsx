import Navbar from "./Navbar";

const Header = ({ user, setUser }) => {
  return (
    <header>
      <h1>Zeus Store</h1>
      <Navbar user={user} setUser={setUser} />
    </header>
  );
};

export default Header;
