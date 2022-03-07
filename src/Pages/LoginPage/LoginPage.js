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

//Form validation imports
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import * as yup from 'yup';



// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Email is invalid!').required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(4, 'Password must be at least 4 characters long!')
    .max(50, 'Password must be of maximum 50 characters!'),
});

const LoginPage = () => {
const [passwordShown, setPasswordShown] = useState(false);

const passToggleHandler = () => {
  setPasswordShown(!passwordShown);
};
  return (
    <MainPage>
    {/* <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      disableScrollViewPanResponder={true}
    /> */}
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
              <PasswordInput>
              <FormInput
                placeholder="Password"
                id="password"
                type={passwordShown ? 'text' : 'password'}
                data-for="password"
              />
              {passwordShown ? (
              <HideIcon onClick={passToggleHandler} />
            ) : (
              <ShowIcon onClick={passToggleHandler} />
            )}
            </PasswordInput>
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
  max-height: 390px;
  position:absolute;
  background-color: #fff;
  opacity: 0.8;
  right: 32%;
  overflow: hidden;
  top:25%;
  z-index: 2;
`;
const StyledLoginForm = styled.div`
  min-height: 100vh;
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

const PasswordInput = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 100%;
    border-radius: 8px 0px 0px 8px;
    margin-bottom: 0px;
    border-right: none;

    &:focus {
      outline: none;
      border: 1px solid #0499ff;
      border-right: none;
    }

    &:focus + {
      svg {
        border: 1px solid #0499ff;
        border-left: none;
      }
    }
  }

  svg {
    height: 46px;
    padding: 8px 14px 8px 8px;
    cursor: pointer;
    fill: #62799d;
    border: 1px solid
      ${(p) => (p.error ? '#c57474' : p.validated ? '#00CB14' : '#62799d')};
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
`;
