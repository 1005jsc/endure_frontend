import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import MainPage from '../Pages/MainPage';
import NotFoundPage from '../Pages/NotFoundPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
