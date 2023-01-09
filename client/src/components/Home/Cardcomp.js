import React, { useState } from "react";
import "./Cardcomp.css";
import { Button } from "react-bootstrap";
import bg1 from "../../Assests/cardimg1.webp";
import bg2 from "../../Assests/cardimg2.webp";
import bg3 from "../../Assests/cardimg3.webp";
import bg4 from "../../Assests/cardimg4.webp";
import Modalcomp from "./Modalcomp";

const Cardcomp = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let bg = bg1;
  if (props.blog.id % 1 === 0) bg = bg1;
  if (props.blog.id % 2 === 0) bg = bg2;
  if (props.blog.id % 3 === 0) bg = bg3;
  if (props.blog.id % 4 === 0) bg = bg4;
  return (
    <div className="cardGroup">
      <div className="cardComp">
        {props.blog.image ? (
          <img src={props.blog.image} alt="Eno ondu" className="imgCard" />
        ) : (
          <div
            className="imgCard"
            style={{ backgroundImage: "url(" + bg + ")" }}
          ></div>
        )}
        <div className="headingCard" style={{ textTransform: "uppercase" }}>
          {props.blog.task}
        </div>
        <div className="contentCard">
          <p>{props.blog.content}</p>
          <div>
            {props.blog.priority === "High" ? (
              <div>🔴</div>
            ) : props.blog.priority === "Medium" ? (
              <div>🟡</div>
            ) : (
              <div> 🟢</div>
            )}
          </div>
          <div className="buttonGrp">
            <Button variant="primary" onClick={handleShow}>
              Show
            </Button>
            <Button
              variant="danger"
              onClick={() => props.deleteTasks(props.blog.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      {show && (
        <Modalcomp show={show} handleClose={handleClose} data={props.blog} />
      )}
    </div>
  );
};

export default Cardcomp;
