import { useEffect, useState, useContext } from "react";
import { UserContext } from "./contexts/User";
import { useParams } from "react-router-dom";
import { getProductById } from "../apiRequests";
import BuyButton from "./BuyButton";

import PopUp from "./PopUp";
import AddToBasket from "./AddToBasket";
import DeleteItem from "./DeleteItem";

const Product = ({ setBasketLenth, basketLength }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { product_id } = useParams();
  const { user } = useContext(UserContext);
  const [Logedin, setLogedin] = useState(false);

  useEffect(() => {
    getProductById(product_id).then((product) => {
      setProduct(product);
      setLoading(false);
    });
  }, [product_id]);

  if (loading) return <p>loading...</p>;

  return (
    <section>
      {Logedin ? PopUp(setLogedin, "You need to log in!") : <></>}
      <h3>{product.item.item_name}</h3>
      <img src={product.item.img_url} alt={product.item.item_name}></img>
      <p>{product.item.category_name}</p>
      <p>{product.item.price}</p>
      <p>{product.item.description}</p>
      <BuyButton
        product_id={product_id}
        username={user}
        setLogedin={setLogedin}
      />
      <AddToBasket
        setLogedin={setLogedin}
        product_id={product.item.item_id}
        username={user}
        setBasketLenth={setBasketLenth}
        basketLength={basketLength}
      />
      <DeleteItem product_id={product.item.item_id} setLogedin={setLogedin} />
    </section>
  );
};

export default Product;
