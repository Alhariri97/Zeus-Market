import { orderItem } from "../apiRequests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/User";

const BuyButton = ({ product_id, username, setLogedin }) => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleOrder = () => {
    if (!user) {
      setLogedin(true);
    } else {
      orderItem(username.user.username, product_id).then(() => {
        navigate("/");
      });
    }
  };
  return (
    <button id="buy-now" onClick={handleOrder}>
      Buy now
    </button>
  );
};

export default BuyButton;
