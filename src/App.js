import React from "react";
import firebaseConfig from "./fireBaseSetup";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import bootstrap from "bootstrap/dist/js/bootstrap";

import { FormAdd } from "./components/FormAdd";
import { TaskList } from "./components/TaskList";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  // Initialize Firebase
  const [task, setTask] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [dangerClassTitle, setDangerTitleClass] = React.useState(false);
  const [dangerClassTask, setDangerTaskClass] = React.useState(false);

  function addTodo(itemTitle, task) {
    if (itemTitle && task) {
      setDangerTaskClass(false);
      setDangerTitleClass(false);
      setLoading(true);
      firebase
        .database()
        .ref()
        .once("value")
        .then((snapshot) => {
          let data = snapshot.val();
          let value = {
            title: itemTitle,
            task,
          };
          if (data !== null)
            if (data.hasOwnProperty("toDoList")) {
              if (data.toDoList.task.length > 0) {
                data.toDoList.task = [...data.toDoList.task, value];
                firebaseSetValue("toDoList", "task", data.toDoList.task);
              } else {
                let data = [value];
                firebaseSetValue("toDoList", "task", data);
              }
            } else {
              let data = [value];
              firebaseSetValue("toDoList", "task", data);
            }
          else {
            let data = [value];
            firebaseSetValue("toDoList", "task", data);
          }
        });
    } else {
      if (!task) setDangerTaskClass(true);
      else setDangerTaskClass(false);
      if (!itemTitle) setDangerTitleClass(true);
      else setDangerTitleClass(false);
    }
  }

  function firebaseSetValue(ref, key, value) {
    firebase
      .database()
      .ref(ref)
      .set({
        [key]: value,
      })
      .then((doc) => {
        setTask("");
        setTitle("");
        setTaskListData(ref + "/" + key);
        setLoading(false);
        let x = new bootstrap.Toast(document.querySelector(".toast"));
        x.show();
      })
      .catch((error) => {
        setLoading(false);
        console.log("this is firebaseSetValue: " + error);
      });
  }
  function setTaskListData(ref) {
    firebase
      .database()
      .ref(ref)
      .once("value")
      .then((snapshot) => {
        let Data = snapshot.val();
        setTaskList(Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleChange(e) {
    e.preventDefault();
    addTodo(title, task);
  }
  const setTaskValue = (e) => {
    setTask(e.target.value);
  };
  const setDataValue = (e) => {
    setTitle(e.target.value);
  };

  React.useEffect(() => {
    setTaskListData("toDoList/task");
  }, []);

  return (
    <>
      <FormAdd
        setTaskValue={setTaskValue}
        setDataValue={setDataValue}
        task={task}
        handleChange={handleChange}
        title={title}
        loading={loading}
        dangerClassTitle={dangerClassTitle}
        dangerClassTask={dangerClassTask}
      />
      <div className="row justify-content-center">
        <div className="col-4">&nbsp;</div>
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
              <div className="toast-body">Task Added successfully</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
        <div className="col-4">&nbsp;</div>
      </div>
      <TaskList taskList={taskList} />
    </>
  );
}

export default App;
