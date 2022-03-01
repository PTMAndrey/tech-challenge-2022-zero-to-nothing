import styled from "styled-components";

const Dashboard = () => {
  return (
    <StyledDashboard>
      <p>test</p>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  color: red;
`;
