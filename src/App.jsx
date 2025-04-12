// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModulesPage from "./pages/ModulesPage";
import ModuleDetail from "./pages/ModuleDetail";
import CartPage from "./pages/CartPage";
import Forum from "./pages/Forum";
import BookSession from "./pages/BookSession";
import UploadSection from "./components/UploadSection";

function App() {
  const [cart, setCart] = useState([]);

  
  
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modules" element={<ModulesPage />} />
      <Route path="/modules/:id" element={<ModuleDetail />} />
      <Route path="/book-session" element={<BookSession />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    </>
  );
}

export default App;