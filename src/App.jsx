import React from 'react';
import SettingFunction from './Context/Settings/index';
import Todo from './Components/Todo';
import { MantineProvider } from '@mantine/core';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/index';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>

    <SettingFunction>
      <div className='app-div'>
      <Header />
      <Todo />
      <Footer />
         </div> 
    </SettingFunction>
    </MantineProvider>

  );
}
