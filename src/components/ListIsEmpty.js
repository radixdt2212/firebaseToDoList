import React from "react";
import { CgSmileSad } from "react-icons/cg";
export const ListIsEmpty = () => {
  return (
    <>
      <br />
      <div className="row justify-content-center container-fluid">
        <div className="col-12 col-md-8 col-lg-4 text-center">
          <div className="progress w-100" style={{ height: "4.5rem" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "100%" }}
            >
              <h1>
                Task list is empty <CgSmileSad color={"#fff"} />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
