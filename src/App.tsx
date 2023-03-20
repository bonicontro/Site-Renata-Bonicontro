import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AstrologyPage from "./pages/AstrologyPage";
import TarotPage from "./pages/TarotPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <div className="App" id="dark">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/astrologia" element={<AstrologyPage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
