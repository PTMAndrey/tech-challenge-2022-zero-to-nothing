import React from "react";
import styled from "styled-components";
import image from "../../Assets/image.jpg";
import { device } from "../DevicesSize/Device";

const Styles = styled.img`
  height: 100vh;
  max-width: 100vw;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  @media ${device.tablet} {
    display: none;
  }
`;
const BackgroundImage = () => {
  return <Styles src={image} />;
};

export default BackgroundImage;
