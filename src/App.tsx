import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GlobalContext from './wrappers/GlobalContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Results from './pages/Results';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import Detail from './pages/Detail';

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <GlobalContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/detail/:type/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </ConfigProvider>
  );
}

export default App;
