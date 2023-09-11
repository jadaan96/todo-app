import React from 'react'
import Todo from '../Todo/index';
import List from '../List/List';
import SettingFunction from '../../Context/Settings/index';

export default function Container() {
    return (
        <div>
            <SettingFunction>
                <Todo />
                <List />
            </SettingFunction>
        </div>
    )
}