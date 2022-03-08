import styled from "styled-components";
const FormInput = styled.input`
  display: block;
  height: 46px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.error ? "#c57474" : p.validated ? "#00CB14" : "#62799d")};
  &:focus {
    outline: none;
    border: 1px solid ${(p) => (p.notFocus ? "#62799d" : "#0499ff")};
  }

  padding: 16px;
  color: #62799d;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  @media (min-width: 851px) {
    max-width: ${(props) => (props.width ? props.width : "420px")};
  }
`;

export default FormInput;
