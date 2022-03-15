import styled from 'styled-components';

const Footer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: calc(100vh-244px);
  padding-right: ${(props) => (props.right ? props.right : '40px')};
  margin: 0 auto;
`;

export default Footer;
