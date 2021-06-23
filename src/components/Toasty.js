import React from "react";

export const Toasty = ({ msg }) => {
  return (
    <>
      <div className="row no-gutters justify-content-center">
        <div className="col-4">
          <div
            className="toast align-items-center text-white bg-primary border-0 w-100"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            delay="100"
            style={{ position: "relative" }}
          >
            <div className="d-flex text-center align-items-center w-100">
              <div className="toast-body">{msg}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
