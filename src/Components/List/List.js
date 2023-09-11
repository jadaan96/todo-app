import React, { useContext, useEffect, useState } from 'react'
import { Setting } from '../../Context/Settings'
import { Pagination } from '@mantine/core';
import Auth from '../auth/auth';
import './list.scss'
import { loginContext } from '../../Context/AuthContext/AuthContext';
export default function List() {
    const {can} = useContext(loginContext); 

    const setting = useContext(Setting)

    const from = localStorage.getItem('form')

    const data = JSON.parse(from)

    const incompleted = setting.state.list.filter(item => item.complete === false)

    const [activePage, setPage] = useState(1);

    let itemPerPage = data ? +data.perPage : 3

    const statItem = (activePage - 1) * itemPerPage
    const endItem = statItem + itemPerPage
    const showingItems = data && data.switch ? setting.state.list.slice(statItem, endItem) : incompleted.slice(statItem, endItem)
    let totalpages = Math.ceil(setting.state.list.length / 3)
    
    function toggleComplete(id) {
        if(can('update')){
            const items = setting.state.list.filter(item => {
                if (item.id === id) {
                    item.complete = !item.complete;
                }
                return item;
            });
            setting.dispatch({ type: 'TOGGLE_COMPLETE', payload: items });
            
        }else return "you dont have the permission"
        
    }
    console.log(setting.state.list);
    
    function deleteItem(id) {
        if(can('delete')){
            const items = showingItems.filter(item => item.id !== id);
            console.log(items);
            setting.dispatch({ type: 'DELETE_ITEM', payload: items });

        }

    }
    useEffect( () => {
        
      }, [setting.state.list]);

    return (
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
    )
}