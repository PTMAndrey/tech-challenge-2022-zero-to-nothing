import { Routes, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LoginPage from '../../Pages/LoginPage/LoginPage';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import NotFound from '../../Pages/NotFound/NotFound';

const Routing = () => {
    return ( 
        <Routes>
            <Route path="/login" exact element={<LoginPage/>} />

            <Route path='/dashboard'  exact element={<Dashboard/>} />

            <Route path="/profile"  exact element={<Dashboard/>} />
        
            <Route path="/profile" exact element={<Dashboard/>} />

            <Route path="/"  exact element={<Dashboard/>} />
         
            <Route path="*" exact element={<NotFound/>} />

        </Routes>


     );
}
 
export default Routing;