import React from "react";
import { Button, Modal } from "react-bootstrap";

const Modalcomp = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.task}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data.content}</p>
        <div>
          Priority:{" "}
          {data.priority === "High" ? (
            <span>High(🔴)</span>
          ) : data.priority === "Medium" ? (
            <span>Medium(🟡)</span>
          ) : (
            <span>Low(🟢)</span>
          )}
        </div>{" "}
        <br />
        <div>
          {data?.image && (
            <img src={data?.image} alt="Eno ondu" className="imgCard" />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalcomp;
