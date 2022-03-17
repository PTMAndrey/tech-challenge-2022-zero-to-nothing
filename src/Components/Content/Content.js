import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import User from '../../Pages/User/User';
import Buildings from '../../Pages/Buildings/Buildings';
import Office from '../../Pages/Office/Office';
import Offices from '../../Pages/Offices/Offices';
import Desk from '../../Pages/Desk/Desk';
import Remote from '../../Pages/Remote/Remote';
import Users from '../../Pages/Users/Users.js';
import Header from '../../Components/Header/Header';

import InProgress from '../../Components/InProgress/InProgress';

// this component represents the Content for every component selected from Sidebar

const Content = () => {
  const showSidebar = useSelector((state) => state.ui.showSidebar);
    const location = useLocation().pathname;
    console.log(location);
    return ( 
        <Container showSidebar={showSidebar}>
            <Header/>
            {location === '/' && <InProgress/> }{/* Dashboard*/}
            {location === '/dashboard' && <InProgress/> }{/* Dashboard*/}
            {location === '/user' && <User/> } {/* User management*/}
            {location === '/buildings' && <Buildings/> }{/* Buildings Management*/}
            {location === '/office' && <InProgress/> }{/* Office Management*/}
            {location === '/offices' && <InProgress/> }{/* Office Status */}
            {location === '/desk' && <InProgress/> }{/* Desk Assignment*/}
            {location === '/remote' && <InProgress/> }{/* Remote request*/}
            {location === '/users' && <Users/> }{/* User Status*/}
        </Container>
     );
};
 
export default Content;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: #f3f6f9;
  transition: filter 0.2s linear;
`;