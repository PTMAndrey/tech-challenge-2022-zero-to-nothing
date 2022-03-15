import styled from "styled-components";

const LabelComponent = styled.label`
  max-width: 189px;
  height: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #0b2559;
  margin-bottom: ${(props) => (props.margin ? props.margin : "10px")};
  border-bottom: ${(props) => (props.border ? props.border : "none")};
`;

export default LabelComponent;