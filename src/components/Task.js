import React from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
export const Task = ({ item, index, deleteElement }) => {
  return (
    <>
      <li
        className="list-group-item d-flex justify-content-between align-items-start mx-2 my-2 shadow-sm bg-white rounded taskItem"
        style={{ borderRadius: "9px" }}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold text-wrap">{item.title}</div>
          <span className="badge bg-primary cornered-pill text-wrap">{item.task}</span>
        </div>

        <button
          type="button"
          style={{
            border: "none",
            background: "transparent",
          }}
          onClick={() => deleteElement(index)}
        >
          <RiDeleteBack2Fill size={45} color={"#332e2ebc"} />
        </button>
      </li>
    </>
  );
};
