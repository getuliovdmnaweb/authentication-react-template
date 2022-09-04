import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginScreen, SignupScreen } from "../screens";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "./routes";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path={ROUTES.SIGNUP} element={<SignupScreen />} />
          <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
          <Route
            path={ROUTES.HOME}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
