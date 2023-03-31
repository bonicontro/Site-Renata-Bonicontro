import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Blog from "./pages/Blog";
import TarotPage from "./pages/TarotPage";
import ContactPage from "./pages/ContactPage";
import Menu from "./components/Menu";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <Router>
      <div className="App" id="tema" data-tema={theme}>
        <Menu theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
