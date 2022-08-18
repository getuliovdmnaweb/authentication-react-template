import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginScreen, SignupScreen } from "../screens";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
