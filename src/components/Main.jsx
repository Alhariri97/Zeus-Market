import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { getAllItems } from "../apiRequests";
import { UserContext } from "./contexts/User";
import PopUp from "./PopUp";
import { Col, Container, Row, Card } from "react-bootstrap";
import BuyButton from "./BuyButton";
import AddToBasket from "./AddToBasket";

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
  }, [searchValue, category, user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Container style={{ margin: "5em auto " }}>
      {Logedin ? PopUp(setLogedin, "You need to log in!") : <></>}
      {loading ? (
        <h4>Loading...</h4>
      ) : !itemsArray.length ? (
        <h3>No items, Try other key words to seaerch... </h3>
      ) : (
        <Row className="">
          {itemsArray.map((item) => {
            return (
              <Col
                sm={6}
                md={4}
                lg={4}
                xl={3}
                key={item.item_id}
                id={item.item_id}
              >
                {/*  */}
                <Card
                  id="card"
                  style={{
                    margin: "10px 0",
                    width: "auto",
                    height: "46vh",
                  }}
                >
                  <Link to={`/product/${item.item_id}`}>
                    <Card.Img
                      style={{ height: "20em" }}
                      variant="top"
                      src={item.img_url}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBjYXR8ZW58MHx8MHx8&w=1000&q=80";
                      }}
                      alt={item.item_name}
                    />
                  </Link>

                  <Card.Body>
                    <h5>{item.item_name}</h5>
                    <p>£{item.price}</p>
                    <BuyButton
                      product_id={item.item_id}
                      setLogedin={setLogedin}
                    />
                    <AddToBasket
                      product_id={item.item_id}
                      setLogedin={setLogedin}
                      setBasketLenth={setBasketLenth}
                      basketLength={basketLength}
                    />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Main;
