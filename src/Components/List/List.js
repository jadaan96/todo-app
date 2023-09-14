import React, { useContext, useEffect, useState } from "react";
import { Setting } from "../../Context/Settings";
import axios from "axios"
import { Pagination } from "@mantine/core";
import Auth from "../auth/auth";
import "./list.scss";
import { loginContext } from "../../Context/AuthContext/AuthContext";
export default function List() {
  const { loggedIn } = useContext(loginContext);

  const [refresh, setRefresh] = useState()
  const [res, setData] = useState([])

  useEffect(() => {
      axios.get(`https://sample-back-end.onrender.com/todo`)
          .then((response) => {
              setData(response.data);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }, [refresh]);

  const { can } = useContext(loginContext);

  const setting = useContext(Setting)

  const data = setting.state.formSetting

  const incompleted = res.filter(item => item.complete === false)

  const [activePage, setPage] = useState(1);

  let itemPerPage = data ? +data.perPage : 3

  const statItem = (activePage - 1) * itemPerPage
  const endItem = statItem + itemPerPage
  const showingItems = data && data.switch ? res.slice(statItem, endItem) : incompleted.slice(statItem, endItem)
  let totalpages = Math.ceil(res.length / 3)

  function toggleComplete(id) {
      if (can('update')) {
          const items = res.filter(item => {
              if (item.id === id) {
                  const state = item.complete = !item.complete;
                  const obj = {
                      complete: state
                  }
                  // const state = item.complete = !item.complete;
                  axios.put(`https://sample-back-end.onrender.com/todo/${id}`, obj).then(data => {
                      console.log(data.data);
                  })
                  // setRefresh(count => count + 1)
              }
              return item;
          });
          setting.dispatch({ type: 'TOGGLE_COMPLETE', payload: items });

      } else return console.log("you dont have the permission");


  }

  function deleteItem(id) {
      if (can('delete')) {
          axios.delete(`https://sample-back-end.onrender.com/todo/${id}`).then(data => {
              setRefresh(data)
          })
          const items = showingItems.filter(item => item.id !== id);
          setting.dispatch({ type: 'DELETE_ITEM', payload: items });
      } else return console.log("you dont have the permission");
  }

  useEffect(() => {

  })

  return (
      <>
          {
              loggedIn &&
              <div>
                  <header data-testid="todo-header" className="todo-header" >
                      <h2 data-testid="todo-h1" >To Do List: {showingItems.length} items pending : </h2>
                  </header>
                  <div className='list-container'>
                      <div className="header-container">
                          {
                              showingItems.map(item => (
                                  <Auth capability="read">
                                      <div key={item.id} className="todo-item">
                                          <p className='pargraph'>Task: {item.text}</p>
                                          <p>Assigned to: {item.assignee}</p>
                                          <p>Difficulty: {item.difficulty}</p>
                                          <div onClick={() => deleteItem(item.id)} >Delete: <button className='btn'>Delete</button> </div>
                                          <div onClick={() => toggleComplete(item.id)} >Complete: <button className='btn'>{item.complete ? "completed" : "pending"}</button> </div>
                                          <hr />
                                      </div>
                                  </Auth>
                              ))}
                      </div>
                  </div>
                  <div className='Slider'>
                      <Pagination value={activePage} onChange={setPage} total={totalpages} />
                  </div>
              </div >
          }
      </>

  )
}
