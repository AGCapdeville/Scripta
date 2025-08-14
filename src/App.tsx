import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DailyGame from './pages/DailyGame';
import Results from './pages/Results';
import Record from './pages/Record';
import About from './pages/About';

function App() {

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/scripta" element={<Home />} />
      <Route path="/scripta/about" element={<About />} />
      <Route path="/scripta/daily" element={<DailyGame />} />
      <Route path="/scripta/results" element={<Results />} />
      <Route path="/scripta/record" element={<Record />} />
    </Routes>
    </>
  );
}

export default App
