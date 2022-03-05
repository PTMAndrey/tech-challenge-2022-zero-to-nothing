import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Page>
      <TitleStyles>Sorry</TitleStyles>
      <br />
      <ContentStyles>Currently page does not exist!</ContentStyles>
      <br />
      <Link to="/">Back to homepage...</Link>
    </Page>
  );
};

export default NotFound;

const Page = styled.div`
  text-align: center;
  margin-top: 15%;
`;

const TitleStyles = styled.h2`
  color: red;
`;

const ContentStyles = styled.p`
  font-weight: 600;
  font-size: 2rem;
`;
