import { useState } from "react";
import { ScrollView } from 'react-native';
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import BackgroundImage from "../../Components/BackImage/BackImage";

//styles
import { css } from "@emotion/react";
import styled from "styled-components";

//Form components
import FormTitle from "../../Components/Form/FormTitle/FormTitle";
import FormLabel from "../../Components/Form/FormLabel/FormLabel";
import FormInput from "../../Components/Form/FormInput/FormInput";
import FormButton from "../../Components/Form/FormButton/FormButton";
import { ReactComponent as ShowIcon } from "../../Assets/show-password.svg";
import { ReactComponent as HideIcon } from "../../Assets/hide-password.svg";

const LoginPage = () => {
  return (
    <MainPage>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
      <BackDropForm>
        <StyledLoginForm>
          <Helmet>
            <title>Tech Challenge | Login</title>
          </Helmet>

          <Container>
            <form>
              <FormTitle>Login to Tech App</FormTitle>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                placeholder="Email Address"
                type="text"
                id="email-address"
                data-for="email"
              />
              <FormLabel htmlFor="email">Password</FormLabel>
              <FormInput
                placeholder="Password"
                type="password"
                id="password"
                data-for="password"
              />
              <FormButton type="submit">Login</FormButton>
            </form>
          </Container>
        </StyledLoginForm>
      </BackDropForm>

      <BackgroundImage />
    </MainPage>
  );
};

export default LoginPage;

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  user-select: none;
  z-index:1;
`;

const BackDropForm = styled.div`
  width: 100%;
  max-width: 420px;
  max-height: 450px;
  position:absolute;
  background-color: #fff;
  opacity: 0.8;
  right: 20%;
  top:5%;
  z-index: 2;
`;
const StyledLoginForm = styled.div`
  margin: 0 auto;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
  width: 100%;
  max-width: 420px;
  padding: 15px;
  z-index: 3;

  a {
    text-decoration: none;
    margin-left: 8px;
    color: #0b2559;
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index:4;
`;
