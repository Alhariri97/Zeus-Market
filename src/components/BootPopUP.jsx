import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function BootPopUP(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerText}
        </Modal.Title>
      </Modal.Header>{" "}
      <Modal.Body>
        <h6>{props.bodayText}</h6>
        {/* <p></p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onHide(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default BootPopUP;
