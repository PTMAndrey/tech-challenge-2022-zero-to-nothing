import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import LoginPage from "../../Pages/LoginPage/LoginPage";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import NotFound from "../../Pages/NotFound/NotFound";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />

        <Route exact path="/dashboard" element={<Dashboard />} />

        <Route exact path="/profile" element={<Dashboard />} />

        <Route exact path="/profile" element={<Dashboard />} />

        <Route exact path="/" element={<Main />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
