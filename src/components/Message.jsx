import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function Message({ setShow, show, textMessage }) {
  //   const [show, setShow] = useState(true);

  return (
    <Row style={{}}>
      <Col xs={12}>
        <Toast
          //   bg="success"
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Zeus</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>
            Woohoo, you've added {textMessage} to your basket!
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default Message;
