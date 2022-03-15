import styled from "styled-components";

const CancelButton = styled.input`
  background-color: transparent;
  color: #0b2559;
  width: 144px;
  height: 56px;
  border-radius: 8px;
  border: 0;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  -webkit-letter-spacing: 0.1em;
  -moz-letter-spacing: 0.1em;
  -ms-letter-spacing: 0.1em;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 16px;
  font-family: "Open-Sans", sans-serif;
  text-align: center;
  margin-right: 20px;
  :hover {
    background-color: #62799d;
    color: black;
    transition: 0.3s;
  }
`;

export default CancelButton;
