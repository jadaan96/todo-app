import React , { useContext, useEffect,useState } from 'react'
import { settingContext } from '../../Context/Settings'
import { Pagination } from '@mantine/core';
import './list.scss'
function List() {
  const Settings = useContext(settingContext)
  const [activePage, setPage] = useState(1);
  let itemPerPage=3

  const statItem= (activePage-1) * itemPerPage
  const endItem = statItem + itemPerPage
  const showingItems = Settings.list.slice(statItem, endItem).filter(item => item.complete === false)
  console.log(showingItems);
  let totalpages =Math.ceil(Settings.list.length/3 )

  const completed = Settings.list.filter(item => item.complete === true)  
  function toggleComplete(id) {

    const items = Settings.list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    Settings.setList(items);

  } 
  useEffect(()=>{
  },[Settings.setList])


  return (
    <div className='list-div'>
       <h2> pending Tasks</h2>
       <div >

      {showingItems.map(item => (
        <div className='cards'>

      {  !item.complete && (
          <div key={item.id}>
            <section className='top-section'>

            <div className='status'  onClick={() => toggleComplete(item.id)}> {item.complete ? "completed" : "pending"}</div>
            <p><small> {item.assignee}</small></p>
            </section>

            <hr />
            <p>{item.text}</p>
            <p className='Difficulty'><small>Difficulty: {item.difficulty}</small></p>
          </div>
        )}
        </div>
        ))}
        <Pagination  value={activePage} onChange={setPage} total={totalpages} />
        </div>

      <section>
        <h2> completed Tasks</h2>
        <div >

      {completed.map(item => (
        <div className='cards'>

      {  item.complete && (
          <div key={item.id}>
            <section className='top-section'>

            <div className='status'  onClick={() => toggleComplete(item.id)}> {item.complete ? "completed" : "pending"}</div>
            <p><small> {item.assignee}</small></p>
            </section>

            <hr />
            <p>{item.text}</p>
            <p className='Difficulty'><small>Difficulty: {item.difficulty}</small></p>
          </div>
        )}
        </div>
        ))}
        <Pagination  value={activePage} onChange={setPage} total={totalpages} />
        </div>
      </section>
    </div>
  );
}

export default List
