import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import BuyButton from "./BuyButton";
import AddToBasket from "./AddToBasket";
import { getAllItems } from "../apiRequests";
import { UserContext } from "./contexts/User";
import PopUp from "./PopUp";

const Main = ({ searchValue, category, setBasketLenth, basketLength }) => {
  const { user } = useContext(UserContext);
  const [itemsArray, setItemsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [Logedin, setLogedin] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllItems(category, searchValue)
      .then(({ items }) => {
        if (items) {
          return setItemsArray(items);
        } else {
          setError("Refresh the page");
        }
      })
      .catch((er) => {
        console.log(er);
      });
    if (user) {
      setLogedin(false);
    }
    setLoading(false);
  }, [searchValue, category, itemsArray, user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      {Logedin ? PopUp(setLogedin, "You need to log in!") : <></>}
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="flex">
          {itemsArray.map((item) => {
            return (
              <div key={item.item_id} id={item.item_id}>
                <Link to={`/product/${item.item_id}`}>
                  <img
                    src={item.img_url}
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBjYXR8ZW58MHx8MHx8&w=1000&q=80";
                    }}
                    alt={item.item_name}
                  ></img>
                  <h3>{item.item_name}</h3>
                  <p>{item.category_name}</p>
                  <p>£{item.price}</p>
                  {/* <p>{item.description}</p> */}
                </Link>
                <BuyButton
                  setLogedin={setLogedin}
                  product_id={item.item_id}
                  username={user}
                />
                <AddToBasket
                  setLogedin={setLogedin}
                  product_id={item.item_id}
                  username={user}
                  setBasketLenth={setBasketLenth}
                  basketLength={basketLength}
                />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Main;
