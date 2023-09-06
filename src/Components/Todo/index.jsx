import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form";
import { settingContext } from "../../Context/Settings/index";
import List from "../List/List";
import { v4 as uuid } from "uuid";
import "./todo.scss";

function Todo() {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const Settings = useContext(settingContext);

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    Settings.setList([...Settings.list, item]);
  }

  // function deleteItem(id) {
  //   const items = Settings.list.filter((item) => item.id !== id);
  //   Settings.setList(items);
  // }

  useEffect(() => {
    let incompleteCount = Settings.list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Settings.list]);

  return (
    <div className="tododiv">
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <div className="main-div">
        {/* <p>sdfsdf</p> */}
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Add To Do Item</h2>

            <label>
              <span>To Do Item</span>
              <input
                onChange={handleChange}
                name="text"
                type="text"
                placeholder="Item Details"
              />
            </label>

            <label>
              <span>Assigned To</span>
              <input
                onChange={handleChange}
                name="assignee"
                type="text"
                placeholder="Assignee Name"
              />
            </label>

            <label>
              <span>Difficulty</span>
              <input
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                type="range"
                min={1}
                max={5}
                name="difficulty"
              />
            </label>

            <label>
              <button type="submit">Add Item</button>
            </label>
          </form>
        </div>
        <section>
          <List />
        </section>
      </div>
    </div>
  );
}

export default Todo;
