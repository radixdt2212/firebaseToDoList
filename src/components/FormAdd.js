import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcTodoList } from "react-icons/fc";
export const FormAdd = ({
  setTaskValue,
  handleChange,
  setDataValue,
  title,
  loading,
  dangerClassTitle,
  dangerClassTask,
  task,
}) => {
  return (
    <>
      <form>
        <div className="container-fluid ">
          <div
            className=" card-body card-header my-5 mx-5 shadow rounded"
            style={{ border: "none" }}
          >
            <div className="row no-gutters justify-content-center">
              <div className="col-4 text-center">
                <h3
                  className="btn btn-light btn-lg w-100 card-body "
                  style={{ fontWeight: "bold" }}
                >
                  <FcTodoList size={35} /> <br />
                  Add Task
                </h3>
              </div>
              <div className="col-12 mt-3 mb-3">
                <input
                  type="text"
                  className={`form-control ${dangerClassTitle && "is-invalid"}`}
                  aria-label="Sizing example input"
                  placeholder="Task Title (Max 50 Char.)"
                  aria-describedby="inputGroup-sizing-default"
                  value={title}
                  required
                  maxLength="50"
                  onChange={setDataValue}
                />
                <div className="invalid-feedback">
                  Please Enter proper Title.
                </div>
              </div>
              <div className="col-12 mt-3 mb-3">
                <textarea
                  type="text"
                  className={`form-control ${dangerClassTask && "is-invalid"}`}
                  aria-label="Sizing example input"
                  placeholder="Task Description (Max 100 Char.)"
                  aria-describedby="inputGroup-sizing-default"
                  style={{ resize: "none" }}
                  rows="3"
                  maxLength="100"
                  value={task}
                  required
                  onChange={setTaskValue}
                ></textarea>
                <div className="invalid-feedback">
                  Please Enter proper task.
                </div>
              </div>
              <div className="col-12 mt-3 mb-3">
                <button
                  className="btn btn-success w-100"
                  type="submit"
                  onClick={handleChange}
                >
                  Submit{" "}
                  {loading && (
                    <div
                      className="spinner-border text-primary relax"
                      role="status"
                      style={{ height: "1rem", width: "1rem" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
