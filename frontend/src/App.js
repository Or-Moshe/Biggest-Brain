import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import CalculationGameCmp from './components/CalculationGameCmp';
import EquationGameCmp from './components/EquationGameCmp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EquationGameCmp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
