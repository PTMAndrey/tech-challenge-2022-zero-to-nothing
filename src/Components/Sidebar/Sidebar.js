import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
// import Hamburger from "hamburger-react";
import { useRef, useEffect } from "react";
import { ReactComponent as Logo } from "../../Assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import items from "./SidebarItems";

const Sidebar = () => {

  return (
    <IconContext.Provider value={{ color: "#62799d" }}>
      {/* <Hamburger positionAbsolute="true"> */}
        <Container>
          <TopContainer>
            <section>
              <Link to="/">
                <Logo />
              </Link>
            </section>
            <div>
                {items
                    .filter( (item) => item.roles.includes('Administrator') )
                    .map( (item) => (
                        <Item
                        label={item.label}
                        key={item.label}
                        to={item.route}
                        >
                            {item.icon}
                            <p>{item.label}</p>
                        </Item>
                    )) }
            </div>




          </TopContainer>
          
        <LogoutItem >
          <LogoutIcon />
          <p>Log out</p>
        </LogoutItem>
          
        </Container>
      {/* </Hamburger> */}
    </IconContext.Provider>
  );
};

export default Sidebar;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  top: 0px;
  position: sticky;
  width: 280px;
  display: flex;
  flex-direction: column;
  background: #0b2559;
  height: 100vh;
  justify-content: space-between;
  transition: transform 0.2s linear;
  padding-bottom: 15px;

  section {
    margin: 0 auto;
    //padding-top: 40px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  width: 280px; // 200px;
  margin: 8px 0;
  font-size: 18px;
  padding: 8px 24px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    p,
    svg {
      filter: brightness(3);
    }
  }

  p {
    color: #62799d;
    margin-left: 16px;
    font-size: 18px;
    font-weight: 600;
  }
`;


const LogoutItem = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  width: 280px;
  margin: 8px 0;
  font-size: 18px;
  padding: 8px 24px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    p,
    svg {
      filter: brightness(3);
    }
  }

  p {
    color: #62799d;
    margin-left: 16px;
    font-size: 18px;
    font-weight: 600;
  }
`;
