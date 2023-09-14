import React, { useContext, useState } from 'react';
import { Setting } from '../../Context/Settings';
import { Text } from '@mantine/core';
import { When } from "react-if";
import './style.css'
import { Card } from 'react-bootstrap';
import { loginContext } from '../../Context/AuthContext/AuthContext';
export default function SettingForm() {
    const { loggedIn } = useContext(loginContext);
    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);
    const setting = useContext(Setting);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const obj = {
            switch: isChecked,
            perPage: e.target.perPage.value || 3,
            sort: e.target.sort.value || 'Difficulty',
        };
        localStorage.setItem('form', JSON.stringify(obj));
        setData(obj);
        setShow(true);
    };

    return (
        <React.Fragment>
            {loggedIn && (
                <div className="bigContainer">
                    <h1>Manage Setting</h1>
                </div>
            )}
            <div className="container">
                <form onSubmit={submitHandler} className="form">
                    <p>Show completed toDo</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            name="check"
                            checked={isChecked}
                            onChange={toggleSwitch}
                        />
                        <span className="slider round"></span>
                    </label>
                    <br />
                    <label htmlFor="perPage">Item per page</label>
                    <input type="number" name="perPage" id="perPage" />
                    <label htmlFor="sort">Sort Keyword</label>
                    <input type="text" name="sort" id="sort" placeholder="Difficulty" />
                    <br />
                    <button type="submit" className="btns">
                        Set new Setting
                    </button>
                </form>
                <When condition={show}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Updated Settings</Card.Title>
                            <br />
                            <Text>
                                <span style={{ color: 'red', fontWeight: 600 }}>
                                    {data.switch ? 'Show' : 'Hide'} The Completed Todos
                                </span>
                            </Text>
                            <br />
                            <Text>Items Per Page: {data.perPage}</Text>
                            <br />
                            <Text>Sort Keyword: {data.sort}</Text>
                            <br />
                        </Card.Body>
                    </Card>
                </When>
            </div>
        </React.Fragment>
    );
}