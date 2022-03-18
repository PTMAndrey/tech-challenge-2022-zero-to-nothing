import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
        <Label>
          Welcome, {localStorage.getItem("name")}
        </Label>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;


const Label = styled.label`
  height: 24px;
  font-weight: 600;
  align-items:center;
  font-size: 32px;
  line-height: 24px;
  color: #0b2559;
  margin-top: 10%;
`;