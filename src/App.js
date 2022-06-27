import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "./components/Header";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import { getUserByUsername } from "./apiRequests";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { UserContext } from "./components/contexts/User";
import Product from "./components/Product";
import Sell from "./components/Sell";
import Users from "./components/Users";
import Basket from "./components/Basket";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null);
  const [basketLength, setBasketLenth] = useState(0);

  useEffect(() => {
    const userFromLocal = localStorage.getItem("user");
    if (userFromLocal) {
      getUserByUsername(userFromLocal).then((userFromApi) => {
        setUser(userFromApi);
      });
    }
    //
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div id="App" className={`App__${user}`}>
          <Header
            setUser={setUser}
            user={user}
            setSearchValue={setSearchValue}
            setCategory={setCategory}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  searchValue={searchValue}
                  category={category}
                  setBasketLenth={setBasketLenth}
                  basketLength={basketLength}
                />
              }
            />
            <Route path="/account/:username" element={<Account />} />

            <Route
              path="/sign-in"
              element={<SignIn setUser={setUser} user={user} />}
            />
            <Route
              path="/sign-up"
              element={<SignUp setUser={setUser} user={user} />}
            />
            <Route
              path="/product/:product_id"
              element={
                <Product
                  setBasketLenth={setBasketLenth}
                  basketLength={basketLength}
                />
              }
            />
            <Route path="/sell" element={<Sell />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/:username/basket"
              element={<Basket setBasketLenth={setBasketLenth} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
