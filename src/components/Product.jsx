import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../apiRequests";
import BuyButton from "./BuyButton";
import BootPopUP from "./BootPopUP";
import Loading from "./Loading";

import AddToBasket from "./AddToBasket";
import DeleteItem from "./DeleteItem";

const Product = ({ setBasketLenth, basketLength }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { product_id } = useParams();
  const [logedin, setLogedin] = useState(false);

  useEffect(() => {
    getProductById(product_id).then((product) => {
      setProduct(product);
      setLoading(false);
    });
  }, [product_id]);

  if (loading) return <Loading />;

  return (
    <div className="product">
      {logedin ? (
        <BootPopUP
          show={logedin}
          onHide={setLogedin}
          headerText={"log in required"}
          bodayText="you need to log in first"
        />
      ) : (
        <></>
      )}

      <h3>{product.item.item_name}</h3>
      <img src={product.item.img_url} alt={product.item.item_name}></img>
      <p>{product.item.category_name}</p>
      <p>£{product.item.price}</p>
      <p className="des-para">{product.item.description}</p>
      <BuyButton product_id={product_id} setLogedin={setLogedin} />
      <AddToBasket
        setLogedin={setLogedin}
        product_id={product.item.item_id}
        setBasketLenth={setBasketLenth}
        basketLength={basketLength}
      />
      <DeleteItem product_id={product.item.item_id} setLogedin={setLogedin} />
    </div>
  );
};

export default Product;
