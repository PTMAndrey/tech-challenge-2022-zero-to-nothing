import styled, { css } from "styled-components";
import { CgClose as CloseIcon } from "react-icons/cg";
import { FiMenu as MenuIcon } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../api/indexApi";

const StyledHamburger = styled.button`
  ${(p) =>
    p.positionAbsolute &&
    css`
      position: absolute;
      margin-top: 23px;
      margin-left: 15px;
    `}
  border: none;
  cursor: pointer;
  background: transparent;
  z-index: 10;
  &:hover {
    filter: brightness(3);
  }

  &:focus {
    outline: none;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;

const StyledIcon = styled.div`
  svg {
    width: 34px;
    height: 34px;
  }
`;

const Hamburger = ({ positionAbsolute = false }) => {
  const showSidebar = useSelector((state) => state.ui.showSidebar);
  const dispatch = useDispatch();

  return (
    <StyledHamburger
      positionAbsolute={positionAbsolute}
      onClick={() => dispatch(toggleSidebar())}
    >
      <StyledIcon>
        {showSidebar ? (
          <CloseIcon color="#62799D" />
        ) : (
          <MenuIcon color="#1c2436" />
        )}
      </StyledIcon>
    </StyledHamburger>
  );
};

export default Hamburger;
