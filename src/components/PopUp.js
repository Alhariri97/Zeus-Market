import React from "react";

function PopUp(func, text) {
  return (
    <div id="pop-up">
      <div className="inner-pop-up">
        <span onClick={() => func(false)}>Close</span>
        <h3>{text}</h3>
      </div>
    </div>
  );
}

export default PopUp;
