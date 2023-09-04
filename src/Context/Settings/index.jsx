import React from "react";
import { useState, useEffect } from 'react';

export const settingContext = React.createContext();

export default function SettingFunction(props) {
    const [list, setList] = useState([]);


    return (
    <settingContext.Provider value={{setList,list}}>
    {props.children}
    </settingContext.Provider>
  );
}
