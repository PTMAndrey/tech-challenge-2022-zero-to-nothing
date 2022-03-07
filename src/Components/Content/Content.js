import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import UsersManagement from '../../Pages/UsersManagement/UsersManagement';
import BuildingsManagement from '../../Pages/BuildingsManagement/BuildingsManagement';
import OfficeManagement from '../../Pages/OfficeManagement/OfficeManagement';
import OfficeStatus from '../../Pages/OfficeStatus/OfficeStatus';
import DeskAssignment from '../../Pages/DeskAssignment/DeskAssignment';
import Remote from '../../Pages/Remote/Remote';
import UserStatus from '../../Pages/UserStatus/UserStatus';


const Content = () => {
    const location = useLocation().pathname;
    return ( 
        <Container>
            {location === '/dashboard' && <Dashboard/> }
            {location === '/user-management' && <UsersManagement/> }
            {location === '/buildings-management' && <BuildingsManagement/> }
            {location === '/office-management' && <OfficeManagement/> }
            {location === '/office-status' && <OfficeStatus/> }
            {location === '/desk-assignment' && <DeskAssignment/> }
            {location === '/remote' && <Remote/> }
            {location === '/user-status' && <UserStatus/> }
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