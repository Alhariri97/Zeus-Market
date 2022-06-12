import { orderItem } from "../apiRequests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/User";
//
import { Button } from "react-bootstrap";

const BuyButton = ({ product_id, setLogedin }) => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  let name;
  if (user) {
    name = user.user.username;
  } else {
    name = false;
  }

  const handleOrder = () => {
    if (!name) {
      setLogedin(true);
    } else {
      orderItem(name, product_id).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <Button
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
      }}
      onClick={handleOrder}
      username={user}
      variant="primary"
      className="buy-now"
    >
      Buy NoW
    </Button>
  );
};

export default BuyButton;
