import React from 'react';
import styled from 'styled-components';
import Hamburger from '../Hamburger/Hamburger';
import { device } from '../DevicesSize/Device';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const Header = () => {
     const link = useLocation().pathname.substring(1);
    const title = link.charAt(0).toUpperCase() + link.slice(1);
  
    return (
      <Container>
        <Helmet>
          <title>TechChallenge | { link =='' ? 'Dashboard' : title}</title>
        </Helmet>
        <Hamburger />
        <TextStyled>{link =='' ? 'Dashboard': title}</TextStyled>
        
      </Container>
    );
  };
  
  export default Header;

  
const Container = styled.div`
top: 0;
position: sticky;
z-index: 5;
border-bottom: 2px solid #f3f6f9;
height: 122px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 36px;
background: white;

@media ${device.tablet} {
  padding: 15px;
  height: 80px;
}
`;

const TextStyled = styled.p`
  font-size: 32px;
  line-height: 42px;
  font-weight: 600;
  color: #1c2436;
  @media ${device.tablet} {
    font-size: 25px;
  }
`;