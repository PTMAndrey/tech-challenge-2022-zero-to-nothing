import React from "react";
import LoginImage from "../../../Assets/LoginImage.svg";
import styled from "styled-components";
import { device } from "../../DevicesSize/device";

const StyledFormImage = styled.img`
  height: 100vh;
  pointer-events: none;

  @media ${device.tablet} {
    display: none;
  }
`;
const FormImage = () => {
  return <StyledFormImage src={LoginImage} />;
};

export default FormImage;
