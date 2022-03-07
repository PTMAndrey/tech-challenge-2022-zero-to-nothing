import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import LoginPage from "../../Pages/LoginPage/LoginPage";
import NotFound from "../../Pages/NotFound/NotFound";
import Main from "../../Components/Main/Main";

const Routing = () => {

  const role = 'Administrator';

  useEffect( () => {
    
    console.log('role:', role);
  })

  return (
    <BrowserRouter>
      
      <Routes>
        <Route exact path="/login" >
          {role === ''  ? <LoginPage/> : <Navigate replace to='/'/>}
       </Route>

        <Route exact path="/dashboard">
          { (role == 'Administrator' || role =='Office Administrator' || role =='Employee' ) ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/users-management">
          {role == 'Administrator'? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/buildings-management">
          {role == 'Administrator' ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/office-management">
          {role == 'Administrator' ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/office-status">
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/desk-assignment">
          {role == 'Administrator' || role =='Office Administrator' ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>

        <Route exact path="/remote">
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' ? 
          <Main /> : <Navigate replace to='/'/>}
        </Route>
        
        <Route exact path="/user-status">
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee'? 
          <Main /> : <Navigate replace to='/'/>}
       </Route>
        
        <Route exact path="/">
          { !role &&  <Navigate to='/login'/>}
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' &&  <Navigate replace to='/dashboard'/>}
          {role == 'Administrator' &&  <Navigate replace to='/users-management'/>}
          {role == 'Administrator' &&  <Navigate replace to='/buildings-management'/>}
          {role == 'Administrator' &&  <Navigate replace to='/office-management'/>}
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' &&  <Navigate replace to='/office-status'/>}
          {role == 'Administrator' || role =='Office Administrator' &&  <Navigate replace to='/desk-assignment'/>}
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' &&  <Navigate replace to='/remote'/>}
          {role == 'Administrator' || role =='Office Administrator' || role =='Employee' &&  <Navigate replace to='/user-status'/>}
          
        
        </Route>

        <Route exact path="*"><NotFound /></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
