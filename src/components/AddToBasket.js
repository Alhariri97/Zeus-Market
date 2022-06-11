import { addToYourBasket } from "../apiRequests";
import { useContext } from "react";
import { UserContext } from "./contexts/User";

const AddToBasket = ({
  product_id,
  username,
  setLogedin,
  setBasketLenth,
  basketLength,
}) => {
  const { user } = useContext(UserContext);
  const handleOrder = (e) => {
    if (!user) {
      setLogedin(true);
    } else {
      addToYourBasket(username.user.username, product_id).then(() => {
        setBasketLenth(basketLength + 1);
        e.target.disabled = true;
        e.target.innerText = "In your basket";
      });
    }
  };
  return (
    <button id="add-to-basket" onClick={(e) => handleOrder(e)}>
      Add to basket
    </button>
  );
};

export default AddToBasket;
