/* React Hooks */
import { useState } from "react";

/* React Router DOM
=================== */
import { Navigate, Route, Routes } from "react-router-dom";

/* Pages
======== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

/* Components
============= */
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./app/hooks";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowed={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
