import React from "react";

// *** Firebase setup ***
import firebaseConfig from "./fireBaseSetup";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";

// *** Bootstrap setup ***
import bootstrap from "bootstrap/dist/js/bootstrap";

// *** Components setup ***
import { FormAdd } from "./components/FormAdd";
import { TaskList } from "./components/TaskList";
import { Toasty } from "./components/Toasty";

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [task, setTask] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [taskList, setTaskList] = React.useState([]);
  const [dangerClassTitle, setDangerTitleClass] = React.useState(false);
  const [dangerClassTask, setDangerTaskClass] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");

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
                firebaseSetValue(
                  "toDoList",
                  "task",
                  data.toDoList.task,
                  "Task created Successfully"
                );
              } else {
                let data = [value];
                firebaseSetValue(
                  "toDoList",
                  "task",
                  data,
                  "Task created Successfully"
                );
              }
            } else {
              let data = [value];
              firebaseSetValue(
                "toDoList",
                "task",
                data,
                "Task created Successfully"
              );
            }
          else {
            let data = [value];
            firebaseSetValue(
              "toDoList",
              "task",
              data,
              "Task created Successfully"
            );
          }
        });
    } else {
      if (!task) setDangerTaskClass(true);
      else setDangerTaskClass(false);
      if (!itemTitle) setDangerTitleClass(true);
      else setDangerTitleClass(false);
    }
  }
  function deleteElement(ID) {
    firebase
      .database()
      .ref("toDoList/task")
      .once("value")
      .then((snapshot) => {
        let Data = snapshot.val();
        Data.splice(ID, 1);
        firebaseSetValue(
          "toDoList",
          "task",
          Data,
          `Task #${parseInt(ID + 1)} deleted Successfully`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function firebaseSetValue(ref, key, value, msg) {
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
        triggerToast(msg);
      })
      .catch((error) => {
        setLoading(false);
        console.log("this is firebaseSetValue: " + error);
      });
  }
  function triggerToast(msg) {
    setToastMsg(msg);
    let x = new bootstrap.Toast(document.querySelector(".toast"));
    x.show();
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
      <Toasty msg={toastMsg} />
      <TaskList taskList={taskList} deleteElement={deleteElement} />
    </>
  );
}

export default App;
