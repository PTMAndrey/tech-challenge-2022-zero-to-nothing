import styled from "styled-components";

const FormLabel = styled.label`
  max-width: 189px;
  height: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #0b2559;

  opacity: 100% !important;
  margin-bottom: ${(props) => (props.margin ? props.margin : "10px")};
  border-bottom: ${(props) => (props.border ? props.border : "none")};
`;

export default FormLabel;
