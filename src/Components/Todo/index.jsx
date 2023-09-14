import React, {  useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { Setting } from '../../Context/Settings'
import { v4 as uuid } from 'uuid';
import './todo.scss'
import { loginContext } from '../../Context/AuthContext/AuthContext';
const Todo = () => {
  const { loggedIn } = useContext(loginContext);
  const setting = useContext(Setting)
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit, values } = useForm(addItem, defaultValues);

  function addItem(item) {

    item.id = uuid();
    item.complete = false;
    setting.dispatch({ type: 'list', payload: item });
    setting.setRefresh(count => count + 1)

  }

  // useEffect(() => {
  //   // let incompleteCount = setting.state.list.filter(item => !item.complete).length;
  //   // // let completeCount = setting.state.list.filter(item => item.complete).length;
  //   // setting.dispatch({ type: 'incomplete', payload: incompleteCount });
  //   // setting.dispatch({ type: 'compelte', payload: completeCount })
  //   // linter will want 'incomplete' added to dependency array unnecessarily. 
  //   // disable code used to avoid linter warning 
  //   // eslint-disable-next-line react-hooks/exhaustive-deps 
  // }, [setting.state.list]);

  return (
    <>
      {loggedIn &&
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Add To-Do Item</h2>
            <label className="form-label">
              <span>To-Do Item</span>
              <input
                onChange={handleChange}
                name="text"
                type="text"
                placeholder="Item Details"
                value={values.text}
              />
            </label>
            <label className="form-label">
              <span>Assigned To</span>
              <input
                onChange={handleChange}
                name="assignee"
                type="text"
                placeholder="Assignee Name"
                value={values.assignee}
              />
            </label>
            <label className="form-label">
              <span>Difficulty</span>
              <input
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                type="range"
                min={1}
                max={5}
                name="difficulty"
                value={values.difficulty}
              />
            </label>
            <label className="form-label">
              <button type="submit">Add Item</button>
            </label>
          </form>

        </div>
      }
    </>
  );
};

export default Todo;