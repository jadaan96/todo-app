import React from "react";
import { useState } from 'react';

export const settingContext = React.createContext();

export default function SettingFunction(props) {
       let id = 0

    const [list, setList] = useState([
           {
               text: 'text 1',
               complete: true,
               assignee : '',
               difficulty: 2,
               id : id++
          },
           {
               text : 'text 2',
               complete: true,
               assignee : '',
               difficulty: 3,
               id : id++
          },
           {
               text : 'text 3',
               complete: true,
               assignee : '',
               difficulty: 4,
               id : id++
          }
     ]);
     console.log(list);


    return (
    <settingContext.Provider value={{setList,list}}>
    {props.children}
    </settingContext.Provider>
  );
}
