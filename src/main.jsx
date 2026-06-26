import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/Home.jsx';
import CoinList from './components/CoinList.jsx';
import CoinDetails from './components/CoinDetails.jsx';
import './index.scss';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter keeps deep links working on static hosts like GitHub Pages. */}
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="coins" element={<CoinList />} />
          <Route path="coins/:id" element={<CoinDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
