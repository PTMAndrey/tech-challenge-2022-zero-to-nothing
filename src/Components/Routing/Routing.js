import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import NotFound from "../../Pages/NotFound/NotFound";
import Main from "../../Components/Main/Main";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRole, setStatus, setToken, setId } from "../../api/apiv2";
import { toggleSidebar } from "../../api/indexApi";
import Desk from "../../Pages/Desk/Desk";

const Routing = () => {
  const status = useSelector((state) => state.auth.user.status);
  const role = useSelector((state) => state.auth.user.role);
  const showSidebar = useSelector((state) => state.ui.showSidebar);
  const location = useLocation();
  const dispatch = useDispatch();

  // runs on mount and everytime the location changes
  useEffect(() => {
    dispatch(setRole(localStorage.getItem("role")));
    dispatch(setStatus(localStorage.getItem("status")));
    dispatch(setToken(localStorage.getItem("token")));
    dispatch(setId(localStorage.getItem("id")));
    if (showSidebar) dispatch(toggleSidebar());
    //console.log("role:", role);
  }, [location]);

  return (
    <Routes>
      <Route
        path="/login"
        exact
        element={role === null ? <LoginPage /> : <Navigate to="/" />}
      />

      <Route
        path="/dashboard"
        exact
        element={
          (role === "Administrator" ||
            role === "OfficeAdministrator" ||
            role === "Employee") ? (
            <Main />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />

      <Route
        path="/user"
        exact
        element={
          role === "Administrator" ? <Main /> : <Navigate replace to="/" />
        }
      />

      <Route
        path="/buildings"
        exact
        element={
          role === "Administrator" ? <Main /> : <Navigate replace to="/" />
        }
      />

      <Route
        path="/office"
        exact
        element={
          role === "Administrator" ? <Main /> : <Navigate replace to="/" />
        }
      />

      <Route
        path="/offices"
        exact
        element={
          role === "Administrator" ||
          role === "OfficeAdministrator" ||
          role === "Employee" ? (
            <Main />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />

      <Route
        path="/desk"
        exact
        element={
          role === "Administrator" || role === "OfficeAdministrator" ? (
            <Main />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />

      <Route
        path="/remote"
        exact
        element={
          role === "Administrator" ||
          role === "OfficeAdministrator" ||
          role === "Employee" ? (
            <Main />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />

      <Route
        path="/users"
        exact
        element={
          role === "Administrator" ||
          role === "OfficeAdministrator" ||
          role === "Employee" ? (
            <Main />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />

      <Route path="*" exact element={<NotFound />} />

      <Route path="/" element={ role===null? <LoginPage/> : <Main/> }>
              <Route
                path="login"
                exact
                element={<Navigate to="/login" />}
              />
              <Route
                path="dashboard"
                exact
                element={<Navigate to="/dashboard" />
                }
              />
              <Route
                path="user"
                exact
                element={
                    <Navigate to="/user" />
                }
              />
              <Route
                path="buildings"
                exact
                element={
                    <Navigate  to="/buildings" />
                  
                }
              />
              <Route
                path="office"
                exact
                element={
                    <Navigate  to="/office" />
                  
                }
              />
              <Route
                path="offices"
                exact
                element={ <Navigate  to="/offices" />
                }
              />
              <Route
                path="desk"
                exact
                element={ <Navigate  to="/desk" />
                }
              />
              <Route
                path="remote"
                exact
                element={<Navigate  to="/remote" />
                }
              />
              <Route
                path="users"
                exact
                element={ <Navigate  to="/users" />
                }
              />
        </Route>

    </Routes>
  );
};

export default Routing;
