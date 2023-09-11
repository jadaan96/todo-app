import React, { useContext, useEffect, useState } from "react";
import { Setting } from "../../Context/Settings";
import axios from "axios"
import { Pagination } from "@mantine/core";
import Auth from "../auth/auth";
import "./list.scss";
import { loginContext } from "../../Context/AuthContext/AuthContext";
export default function List() {
  const { can ,loggedIn } = useContext(loginContext);
const [todoList,setTodoList]=useState([])
const [completed,setCompleted]=useState(true)
  const setting = useContext(Setting);

  const from = localStorage.getItem("form");
 { loggedIn &&
  axios.get(`http://localhost:3001/todo`).then((data) => {
    setTodoList(data.data)
  });
}
  const data = JSON.parse(from);

  const incompleted = todoList.filter(
    (item) => item.complete === false
  );

  const [activePage, setPage] = useState(1);

  let itemPerPage = data ? +data.perPage : 3;

  const statItem = (activePage - 1) * itemPerPage;
  const endItem = statItem + itemPerPage;
  const showingItems =
    data && data.switch
      ? todoList.slice(statItem, endItem)
      : incompleted.slice(statItem, endItem);
  let totalpages = Math.ceil(todoList.length / 3);

  function toggleComplete(id) {
    const updatedData ={
      id:id,
      complete: completed
    }
    console.log(updatedData);
      try {
          axios.put(`http://localhost:3001/todo`, updatedData).then((data)=>{
            setTodoList(data.data)
            console.log('Update successful:', data);
          })
      } catch (error) {
        // Handle any errors that occur during the update request
        console.error('Update failed:', error);
        throw error; // You can choose to throw the error for handling elsewhere if needed
      }

    if (can("update")) {
      const items = todoList.filter((item) => {
        if (item.id === id) {
          item.complete = !item.complete;
          console.log(item.complete);
          setCompleted(!item.complete)
        }
        return item;
      });
      setting.dispatch({ type: "TOGGLE_COMPLETE", payload: items });
    } else return "you dont have the permission";
  }

  function deleteItem(id) {
    if (can("delete")) {
      const items = showingItems.filter((item) => item.id !== id);
      console.log(items);
      setting.dispatch({ type: "DELETE_ITEM", payload: items });
    }
  }
  useEffect(() => {}, [todoList]);

  return (
    <div>
      <header data-testid="todo-header" className="todo-header">
        <h2 data-testid="todo-h1">
          To Do List: {showingItems.length} items pending :{" "}
        </h2>
      </header>
      <div className="list-container">
        <div className="header-container">
          {showingItems.map((item) => (
            <Auth capability="read">
              <div key={item.id} className="todo-item">
                <p className="pargraph">Task: {item.text}</p>
                <p>Assigned to: {item.assignee}</p>
                <p>Difficulty: {item.difficulty}</p>
                <div onClick={() => deleteItem(item.id)}>
                  Delete: <button className="btn">Delete</button>{" "}
                </div>

                <div onClick={() => toggleComplete(item.id)}>
                  Complete:{" "}
                  <button className="btn">
                    {item.complete ? "completed" : "pending"}
                  </button>{" "}
                </div>
                <hr />
              </div>
            </Auth>
          ))}
        </div>
      </div>
      <div className="Slider">
        <Pagination value={activePage} onChange={setPage} total={totalpages} />
      </div>
    </div>
  );
}
