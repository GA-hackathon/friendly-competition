import React from "react";
import StyledLoading from "./styledFunLoading";

function FunOrangeLoading() {
  return (
    <StyledLoading>
      <div className="loading-wrapper">
        <div className="content-container">
          {/* <div className="logo-container">
            <img
              className="logo"
              src="https://i.imgur.com/YnBGN1P.png"
              alt="logo"
            />
            Loading...
          </div> */}
          <img
            className="loading"
            style={{ width: "50vw" }}
            src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
            alt="loading"
          />
        </div>
      </div>
    </StyledLoading>
  );
}

export default FunOrangeLoading;
