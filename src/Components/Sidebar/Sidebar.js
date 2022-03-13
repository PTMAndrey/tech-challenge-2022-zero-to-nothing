import styled, { css }  from "styled-components";
import { IconContext } from "react-icons";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//Api
import { logoutUser } from '../../api/apiv2';
import { toggleSidebar } from "../../api/indexApi";

//Components
import {device} from '../DevicesSize/Device';
import Hamburger from "../Hamburger/Hamburger";
import items from "./SidebarItems";

// logo
import { ReactComponent as Logo } from "../../Assets/logo.svg";


const Sidebar = () => {

  const role = useSelector((state) => state.auth.user.role);
  const showSidebar = useSelector( (state) => state.ui.showSidebar)
  const dispatch = useDispatch();
  const history = useNavigate();
  const sidebar = useRef();
  useEffect( () => {
    const checkIfClickedOutside = (e) => {
      if( showSidebar && 
          sidebar.current &&
          !sidebar.current.contains(e.target)
        ){
          dispatch(toggleSidebar());
        }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showSidebar, dispatch]);

  const closeSidebar = () => {
    if(showSidebar) dispatch(toggleSidebar());
  };

  return (
    <IconContext.Provider value={{ color: "#62799d" }}>
      { showSidebar && <Hamburger  positionAbsolute='true' />}
        <Container ref={sidebar} showSidebar={showSidebar}>
          <TopContainer>
            <section>
              <Link to="/">
                <Logo />
              </Link>
            </section>
            <div>
                {items
                    .filter( (item) => item.roles.includes(role) )
                    .map( (item) => (
                        <Item
                        onClick={closeSidebar}
                        label={item.label}
                        key={item.label}
                        to={item.route}
                        >
                          <Link to={item.route}>
                            <p>{item.icon}</p>
                          </Link> 
                          <Link to={item.route}>
                            <p>{item.label}</p>
                          </Link>
                        </Item>
                    )) }
            </div>




          </TopContainer>
          
        <LogoutItem onClick={() => dispatch(logoutUser({ history: history }))} >
          <LogoutIcon />
          <p>Log out</p>
        </LogoutItem>
        </Container>
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
  width: 200px;
  display: flex;
  flex-direction: column;
  background: #0b2559;
  height: 100vh;
  justify-content: space-between;
  transition: transform 0.2s linear;
  padding-bottom: 10px;

  section {
    margin: 0 auto;
    //padding-top: 40px;
  }
  
  @media ${device.tablet} {
    position: fixed;
    z-index: 1;
    transform: translateX(${(p) => (p.showSidebar ? ' ' : '-100%')});
    ${(p) =>
      p.showSidebar &&
      css`
        box-shadow: 2px 0 40px -20px;
      `}

    section {
      padding-top: 90px;
    }
  }

`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  width: 200px; // 200px;
  margin: 10px 0;
  font-size: 18px;
  padding: 8px 12px;
  cursor: pointer;
  text-decoration: none;

  ${(p) =>
    p.label &&
    p.label === p.title &&
    css`
      background: #0c2e6e;
      p,
      svg {
        filter: brightness(3);
      }
    `}

  &:hover {
    p,
    svg {
      filter: brightness(3);
    }
  }

  p {
    color: #62799d;
    margin-left: 10px;
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
  
${(p) =>
    p.label &&
    p.label === p.title &&
    css`
      background: #0c2e6e;
      p,
      svg {
        filter: brightness(3);
      }
    `}

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
