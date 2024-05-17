import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Heading from "./components/Heading";
import ListingPage from "./pages/List";

function App() {
  return (
    <>
      <Heading />
      <Toaster />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<ListingPage />} />
      </Routes>
    </>
  );
}

export default App;
