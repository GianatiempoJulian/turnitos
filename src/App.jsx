// ======== Importaciones de React ========//
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import "../public/preset.css"

// ======== Componentes ========//
import AppointmentList from './components/Appoitments/AppoitmentList/AppoitmentList';
import AppoitmentState from './components/Appoitments/AppoitmentState/AppointmentState';
import UserAppointments from './components/Appoitments/UserAppointments/UserAppointments';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/turnos' element={<AppointmentList/>}/>
        <Route path='/turnos/:id/estado/' element={<AppoitmentState/>}/>
        <Route path='/mis-turnos' element={<UserAppointments/>}/>
      </Routes>
    </Router>

    
  )
}

export default App
