import { useState } from "react";
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";
import BackgroundImage from "../../Components/BackImage/BackImage";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

//styles
import styled from "styled-components";

//Form components
import FormTitle from "../../Components/Form/FormTitle/FormTitle";
import FormLabel from "../../Components/Form/FormLabel/FormLabel";
import FormInput from "../../Components/Form/FormInput/FormInput";
import FormButton from "../../Components/Form/FormButton/FormButton";
import { ReactComponent as ShowIcon } from "../../Assets/show-password.svg";
import { ReactComponent as HideIcon } from "../../Assets/hide-password.svg";
import { device } from "../../Components/DevicesSize/Device";

//Form validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { css } from '@emotion/react';

//API
import endpoints from '../../api/endpoints';
import { getUser } from '../../api/apiv2';


// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Email is invalid!").required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .label("Password Confirm")
    .min(4, "Password must be at least 4 characters long!")
    .max(50, "Password must be of maximum 50 characters!"),
});

const override = css`
  display: block;
  margin: 0 auto;
`;
const color = '#0b2559';

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const pending = useSelector((state) => state.pending.isPending);
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [role, setRole] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  const handleValid = () => {
    setIsValid(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (form)=> {
    dispatch(
      getUser({
        endpoint: endpoints.login,
        body: form,
        history: history,
      })
    );
  };

  return (
    <MainPage>
      {/* {loggedIn ? <Navigate to="/" /> : null} */}
     
      <BackDropForm>
        <StyledLoginForm>
          <Helmet>
            <title>Tech Challenge | Login</title>
          </Helmet>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)} spellCheck="false">
              <FormTitle>Login to Tech App</FormTitle>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                placeholder="Email Address"
                validated={isValid}
                error={isValid && errors.email}
                type="text"
                id="email-add"
                data-for="email"
                data-tip={`${errors.email ? errors.email.message : ""}`}
                {...register("email")}
              />
              <ReactTooltip
                id="email"
                type="error"
                effect="solid"
                place="right"
                getContent={() => (errors.email ? errors.email.message : "")}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput
                error={isValid && errors.password}
                data-tip={`${errors.password ? errors.password.message : ""}`}
                validated={isValid}
                data-for="passwordinput"
              >
                <FormInput
                  placeholder="Password"
                  id="password"
                  error={isValid && errors.password}
                  validated={isValid}
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  {...register("password")}
                />
                {passwordShown ? (
                  <HideIcon onClick={passToggleHandler} />
                ) : (
                  <ShowIcon onClick={passToggleHandler} />
                )}
              </PasswordInput>
              <ReactTooltip
                id="passwordinput"
                place="right"
                type="error"
                effect="solid"
                getContent={() =>
                  errors.password ? errors.password.message : ""
                }
              />{pending && (
                <ClipLoader
                  color={color}
                  loading={pending}
                  css={override}
                  size={50}
                />
              )}
              <FormButton type="submit" onClick={() => handleValid()}>
                Login
              </FormButton>
              
          {state.error && <p>{state.error.substring(7)}</p>}
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
  z-index: 1;
`;

const BackDropForm = styled.div`
  width: 100%;
  max-width: 420px;
  max-height: 430px;
  position: absolute;
  background-color: #fff;
  opacity: 0.8;
  right: 32%;
  overflow: hidden;
  top: 25%;
  z-index: 2;

  @media ${device.tablet} {
    left: 25%;
  }

  @media ${device.mobileL} {
    left: 5%;
  }
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
  z-index: 4;
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
      border: 1px solid #0048ba;
      border-right: none;
    }

    &:focus + {
      svg {
        border: 1px solid #0048ba;
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
      ${(p) => (p.error ? "#c57474" : p.validated ? "#00CB14" : "#62799d")};
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
`;
