import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddSlot from './pages/AddSlot';
import FindParking from './pages/FindParking';
import BookingForm from './pages/BookingForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-slot" element={<AddSlot />} />
        <Route path="/search" element={<FindParking />} />

<Route path="/book" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;