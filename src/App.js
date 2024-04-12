
import "./app.scss";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import Divider from "./components/Divider"
import Task from "./components/Task";
import FormInputTask from "./components/FormInputTask";
import { useEffect, useState } from "react";

// const listTask = [
//   {
//     id: 1,
//     taskName: "Task 1",
//     isDone: true,
//   },
//   {
//     id: 2,
//     taskName: "Task 2",
//     isDone: false,
//   },
//   {
//     id: 3,
//     taskName: "Task 3",
//     isDone: true,
//   },
//   {
//     id: 4,
//     taskName: "Task 4",
//     isDone: false,
//   },
//   {
//     id: 5,
//     taskName: "Task 5",
//     isDone: false,
//   },
// ];
const KEY_TASK_LIST = "tasks";
function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(KEY_TASK_LIST)) || []
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataPerPage: [],
    limitPerPage: 5,
  })
  const renderTaskList = (tasks) => {
    return tasks.map((task) => (
      <Task
        key={tasks.id} task={task}
        handleRemoveTask={handleRemoveTask}
        handleMakeDoneTask={handleMakeDoneTask}
      />));
  };
  const handleRemoveTask = (taskId) => {
    const _taskList = tasks.filter(task => task.id !== taskId);
    setTasks(_taskList);
    localStorage.setItem(KEY_TASK_LIST, JSON.stringify(_taskList));
    console.log("Delete Task: ", taskId);
  };
  const handleMakeDoneTask = (taskId) => {

    const existedTaskById = tasks.findIndex((task) => task.id === taskId);
    const _taskList = [...tasks];
    _taskList[existedTaskById] = {
      ..._taskList[existedTaskById],
      isDone: true,
    };
    setTasks(_taskList);
    localStorage.setItem(KEY_TASK_LIST, JSON.stringify(_taskList));
    console.log("Done Task: ", taskId);
  };
  const handleAddTask = (taskName) => {
    console.log(taskName, "taskName ne:");
    const _task = {
      id: new Date().getTime(),
      taskName: taskName,
      isDone: false,
    };
    setTasks([_task, ...tasks]);
    localStorage.setItem(KEY_TASK_LIST, JSON.stringify([_task, ...tasks]));
  };
  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    })
  };
  useEffect(() => {
    if (!tasks.length) {
      setPagination({
        ...pagination,
        dataPerPage: [],
      });
      return;
    }
    const _taskList = [...tasks];
    const startIndex = (pagination.currentPage - 1) * pagination.limitPerPage;
    const endIndex = pagination.currentPage * pagination.limitPerPage;
    const tasksPerPage = _taskList.slice(startIndex, endIndex);
    setPagination({
      ...pagination,
      dataPerPage: [...tasksPerPage],
    });
  }, [tasks, pagination.currentPage]);
  return (
    <div className="App">
      <div className="todo-list-container">
        <div className="todo-list-wrapper">
          <FormInputTask handleAddTask={handleAddTask} />
          <div className="todo-list-main">
            {!tasks.length && <div> Please Input Your Task </div>}
            {renderTaskList(pagination.dataPerPage)}
          </div>
          <Divider />
          <div className="todo-list-pagination">
            <Pagination
              defaultCurrent={pagination.currentPage}
              current={pagination.currentPage}
              onChange={(page) => handleChangePage(page)}
              total={tasks.length || 0}
              pageSize={pagination.limitPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
