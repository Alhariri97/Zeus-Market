import MainNavBar from "./Burger";

const Header = ({ user, setUser, setSearchValue, setCategory }) => {
  return (
    <header>
      <MainNavBar
        user={user}
        setUser={setUser}
        setSearchValue={setSearchValue}
        setCategory={setCategory}
      />
    </header>
  );
};

export default Header;
