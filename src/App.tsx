import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { DailyGame } from './pages/DailyGame';
import { About } from './pages/About';
import { Record } from './pages/Record';
import './App.css';
import { Page } from './components/Framer';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait"> {/* ensures exit finishes before enter */}
        <Routes location={location} key={location.pathname}>
          <Route path="/scripta/"       element={<Page><Home /> </Page>} />
          <Route path="/scripta/about"  element={<Page><About /> </Page>} />
          <Route path="/scripta/daily"  element={<Page><DailyGame /> </Page>} />
          <Route path="/scripta/record" element={<Page><Record /> </Page>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
