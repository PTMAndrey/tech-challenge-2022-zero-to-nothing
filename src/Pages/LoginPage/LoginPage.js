import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import FormTitle from '../../Components/FormTitle/FormTitleComponent';

import { ReactComponent as ShowIcon } from '../../Assets/show-password.svg';
import { ReactComponent as HideIcon } from '../../Assets/hide-password.svg';
import ReactTooltip from 'react-tooltip';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';

import { Helmet } from 'react-helmet';


const LoginPage = () => {
    return ( 
        <StyledLoginForm>
            <Helmet>
                <title>Tech Challenge | Login</title>
            </Helmet>

            <Container>
                <form>
                    <FormTitle>

                    </FormTitle>
                </form>
            </Container>
        </StyledLoginForm>
     );
}
 
export default LoginPage;

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
