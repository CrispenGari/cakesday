import React from "react";
import { Routes as R, Route, BrowserRouter as Router } from "react-router-dom";
import { Home, NotFound } from "../pages";
interface Props {}
const Routes: React.FC<Props> = () => {
  return (
    <Router>
      <R>
        <Route path="/" caseSensitive element={<Home />} />
        <Route path="*" element={<NotFound />} caseSensitive />
      </R>
    </Router>
  );
};

export default Routes;
