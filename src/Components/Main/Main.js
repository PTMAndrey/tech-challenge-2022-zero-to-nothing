import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

const StyledMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const Main = () => {
    return ( 
        <StyledMain>
            <Sidebar/>
            <Content/>
        </StyledMain>
     );
}
 
export default Main;