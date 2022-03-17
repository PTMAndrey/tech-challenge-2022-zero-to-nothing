import styled from "styled-components";
import { device } from "../../Components/DevicesSize/Device";
import {ReactComponent as Image} from "../../Assets/PageInConstruction.svg";
const InProgress = () => {
    return ( 
        <Container>
            <Label>This page is under construction!</Label>
            <br/>
            <Image width={350} height={350}/>
           
        </Container>
     );
}
 
export default InProgress;

const Container = styled.div`
  max-width: 1160px;
  width: 100%;
  padding: 24px 40px;
  margin: 0 auto;
  min-height: 81%;

  @media ${device.mobileM} {
    padding: 15px;
  }
`;

const Label = styled.label`
  max-width: 189px;
  height: 24px;
  font-weight: 600;
  align-items:center;
  font-size: 32px;
  line-height: 24px;
  color: #0b2559;
`;