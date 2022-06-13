import { addToYourBasket, getProductById } from "../apiRequests";
import { useContext } from "react";
import { UserContext } from "./contexts/User";
import { Button } from "react-bootstrap";

const AddToBasket = ({
  product_id,
  setLogedin,
  setBasketLenth,
  basketLength,
  setTextMessage,
  setShow,
}) => {
  const { user } = useContext(UserContext);
  let name;
  if (user) {
    name = user.user.username;
  } else {
    name = false;
  }

  const handleOrder = async (e) => {
    let gettingProductName = await getProductById(product_id);

    if (!name) {
      setLogedin(true);
    } else {
      addToYourBasket(name, product_id).then(() => {
        setBasketLenth(basketLength + 1);
        e.target.disabled = true;
        e.target.innerText = "In your basket";
        setShow(true);
        try {
          setTextMessage(gettingProductName.item.item_name);
        } catch (e) {
          console.log(e);
        }
      });
    }
  };
  //

  return (
    <>
      <Button
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
        onClick={(e) => handleOrder(e)}
        username={user}
        variant="primary"
        className="add-to"
      >
        Add to basket
      </Button>
    </>
  );
};

export default AddToBasket;
