import styled from "styled-components";

const FormButton = styled.button`
  width: 144px;
  height: 56px;
  border-radius: 8px;
  margin-top: 32px;
  margin-bottom: 16px;
  background-color: ${(props) => (props.bcolor ? props.bcolor : "#0b2559")};
  color: ${(props) => (props.color ? props.color : "white")};
  margin: ${(props) => props.margin && props.margin};
  border: 0;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  font-family: "Open-Sans", sans-serif;
  text-align: center;
  user-select: none;

  :hover {
    background-color: #62799d;
    color: black;
    transition: 0.3s;
  }
`;

export default FormButton;
