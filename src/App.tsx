import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Blog from "./pages/Blog";
import TarotPage from "./pages/TarotPage";
import ContactPage from "./pages/ContactPage";
import Menu from "./components/Menu";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  function handleThemeChange(e: any) {
    const newTheme = e.target.checked ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <Router>
      <div className={`App ${theme}`} id="tema" data-tema={theme}>
        <Menu theme={theme} handleThemeChange={handleThemeChange} />
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
