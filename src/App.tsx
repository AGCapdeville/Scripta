import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DailyGame from './pages/DailyGame';
import Results from './pages/Results';
import About from './pages/About';


function App() {

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/daily" element={<DailyGame />} />
      <Route path="/results" element={<Results />} />
    </Routes>
    </>
  );
}

export default App
