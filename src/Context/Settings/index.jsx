'use strict'

import React, { useReducer } from 'react';

import { INITIAL_STATES, reducerHandler } from '../Reducer';

export const Setting = React.createContext();

export default function Context(props) {

    const [state, dispatch] = useReducer(reducerHandler, INITIAL_STATES)

    return (
        <Setting.Provider value={{ state, dispatch }}>
            {props.children}
        </Setting.Provider>
    )
}