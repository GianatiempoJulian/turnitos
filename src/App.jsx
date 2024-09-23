// ======== Importaciones de React ========//
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import "../public/preset.css"

// ======== Componentes [Appoitments] ========//
import AppointmentList from './components/Appoitments/AppoitmentList/AppoitmentList';
import AppoitmentState from './components/Appoitments/AppoitmentState/AppointmentState';

// ======== Componentes [Customers] ========//
import CustomerProfile from './components/Customers/CustomerProfile/CustomerProfile';
import CustomerEditProfile from './components/Customers/CustomerEditProfile/CustomerEditProfile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/turnos' element={<AppointmentList/>}/>
        <Route path='/turnos/:id/estado/' element={<AppoitmentState/>}/>
        <Route path='/perfil' element={<CustomerProfile/>}/>
        <Route path='/perfil/editar' element={<CustomerEditProfile/>}/>
      </Routes>
    </Router>

    
  )
}

export default App
