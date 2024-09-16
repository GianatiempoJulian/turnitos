//========== REACT BASIC FUNCIONALITIES ==========//
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import "../public/preset.css"

//========== COMPONENTS ==========//
import AppointmentList from './components/Appoitments/AppoitmentList/AppoitmentList';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/turnos' element={<AppointmentList/>}/>
      </Routes>
    </Router>

    
  )
}

export default App
