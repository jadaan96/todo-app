import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SettingFunction from './Context/Settings/index';
import { MantineProvider } from '@mantine/core';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/index';
import Container from './Components/container/Container';
import SettingForm from './Components/settingsForm';
import LoginProvider from './Context/AuthContext/AuthContext';
import Signup from './Components/siginup/Siginup';



export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
<LoginProvider>

  <SettingFunction>
      <Header />
      <Routes>
        <Route path='/setting' element={<SettingForm />} />
        <Route path='/' element={<Container />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
      <Footer />
    </SettingFunction>
    </LoginProvider>

    </MantineProvider>

  );
}
