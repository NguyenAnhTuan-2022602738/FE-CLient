// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
