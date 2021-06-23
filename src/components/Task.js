import React from "react";
import { TiDelete } from "react-icons/ti";
export const Task = ({ item, index, deleteElement }) => {
  return (
    <>
      <li
        className="list-group-item d-flex justify-content-between align-items-start mx-2 my-2 shadow-sm bg-white rounded taskItem"
        style={{ borderRadius: "9px" }}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item.title}</div>
          <span className="badge bg-primary rounded-pill">{item.task}</span>
        </div>

        <button
          type="button"
          className="btn btn-circle btn-danger "
          onClick={() => deleteElement(index)}
        >
          <TiDelete size={25} color={"#fff"} />
        </button>
      </li>
    </>
  );
};
