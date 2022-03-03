import React from "react";
import styled from "styled-components";
import image from "../../Assets/image.jpg";

const Styles = styled.img`
  height: 100vh;
  width: 100vw;
  pointer-events: none;
`;
const BackgroundImage = () => {
  return <Styles src={image} />;
};

export default BackgroundImage;
