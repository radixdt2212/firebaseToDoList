import React from "react";
import { Task } from "./Task";
export const TaskList = ({ taskList, deleteElement }) => {
  return (
    <>
      <div className="container-fluid">
        <div
          className=" card-body card-header my-5 mx-5"
          style={{ border: "none" }}
        >
          <div className="row no-gutters justify-content-center">
            <div className="col-12">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
