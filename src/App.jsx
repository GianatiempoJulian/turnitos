//========== REACT BASIC FUNCIONALITIES ==========//
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import "../public/preset.css"

//========== COMPONENTS ==========//
import AppointmentList from './components/Appoitments/AppoitmentList/AppoitmentList';
import AppoitmentState from './components/Appoitments/AppoitmentState/AppointmentState';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/turnos' element={<AppointmentList/>}/>
        <Route path='/turnos/estado/:id' element={<AppoitmentState/>}/>
      </Routes>
    </Router>

    
  )
}

export default App
