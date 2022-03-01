import { useState } from "react";
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "../../Assets/image.jpg";

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

//Form validation imports
import { useForm } from "react-hook-form";

const LoginPage = () => {
  return (
    <MainPage>
      <StyledLoginForm>
        <Helmet>
          <title>Tech Challenge | Login</title>
        </Helmet>

        <Container>
          <form>
            <FormTitle>Login to Tech App</FormTitle>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <FormInput type="text" id="email-address" data-for="email" />
            <FormLabel htmlFor="email">Password</FormLabel>
            <input type="password" id="password" />
            <FormButton type="submit">Login</FormButton>

            {/* <button
            type="submit"
            onClick={() => {
              let email = document.getElementById("email-address").value;
              let pass = document.getElementById("password").value;
              alert("Email is : " + email + "\nPassword is : " + pass);
            }}
          >
            Click me!
          </button> */}
          </form>
        </Container>
      </StyledLoginForm>
    </MainPage>
  );
};

export default LoginPage;

const MainPage = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  user-select: none;
`;

const StyledLoginForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
  width: 100%;
  max-width: 420px;
  padding: 15px;

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
`;
