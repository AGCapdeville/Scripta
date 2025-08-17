import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { DailyGame } from './pages/DailyGame';
import { About } from './pages/About';
import { Record } from './pages/Record';
import './App.css';

function App() {

  return (
    <>
    <Navbar />

    <Routes>
      {/* exact match */}
      <Route path="/scripta/" element={<Home />} />
      <Route path="/scripta/about" element={<About />} />
      <Route path="/scripta/daily" element={<DailyGame />} />
      <Route path="/scripta/record" element={<Record />} />
    </Routes>
    </>
  );
}

export default App
