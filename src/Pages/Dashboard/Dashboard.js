
import styled from 'styled-components';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  color:black;
`;

const Dashboard = () => {
    return ( 
        <StyledDashboard>
            <p>test</p>
        </StyledDashboard>
     );
}
 
export default Dashboard;