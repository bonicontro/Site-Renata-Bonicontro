import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Blog from "./pages/Blog";
import TarotPage from "./pages/TarotPage";
import ContactPage from "./pages/ContactPage";
import Menu from "./components/Menu";
import Post from "./components/Post";
import Footer from "./components/Footer";
import "./App.css";

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
    <Router basename="/renata/teste">
      <div className={`App ${theme}`} id="tema" data-tema={theme}>
        <Menu theme={theme} handleThemeChange={handleThemeChange} />
        <div className="content fade">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/blog/post/:id" element={<Post />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
