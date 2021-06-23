import React from "react";
import { Task } from "./Task";
export const TaskList = ({ taskList, deleteElement, dataLoading }) => {
  return (
    <>
      <div className="container-fluid">
        <div
          className=" card-body card-header my-5 mx-5"
          style={{ border: "none" }}
        >
          <div className="row no-gutters justify-content-center">
            <div className="col-12">
              {dataLoading ? (
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-4 col-8 text-center">
                    <div className="spinner-grow text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    &nbsp;&nbsp;
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    &nbsp;&nbsp;
                    <div className="spinner-grow text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <ol className="list-group list-group-numbered">
                  {taskList.map((item, index) => {
                    return (
                      <Task
                        deleteElement={deleteElement}
                        item={item}
                        index={index}
                        key={index}
                      />
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
