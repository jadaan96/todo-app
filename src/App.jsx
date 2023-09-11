import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SettingFunction from './Context/Settings/index';
import Todo from './Components/Todo';
import { MantineProvider } from '@mantine/core';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/index';
import Container from './Components/container/Container';
import SettingForm from './Components/settingsForm';



export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>

  <SettingFunction>
      <Header />
      <Routes>
        <Route path='/setting' element={<SettingForm />} />
        <Route path='/' element={<Container />} />
      </Routes>
      <Footer />
    </SettingFunction>
    </MantineProvider>

  );
}
