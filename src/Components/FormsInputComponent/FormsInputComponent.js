import styled, { css } from 'styled-components';
import ErrorIcon from '../../Assets/error-icon.svg';
import SuccessIcon from '../../Assets/success-icon.svg';

const FormsInputComponent = styled.input`
  display: block;
  height: 46px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.error ? '#c57474' : p.validated ? '#00CB14' : '#62799d')};
  &:focus {
    outline: none;

    /* border: 1px solid #0499ff; */
    border: 1px solid ${(p) => (p.notFocus ? '#62799d' : '#0499ff')};
  }

  &:focus + {
    svg {
      border: 1px solid #0499ff;
      border-left: none;
    }
  }
  padding: 16px;
  color: #62799d;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  background: ${(p) =>
    p.error ? `url(${ErrorIcon})` : p.validated ? `url(${SuccessIcon})` : ''};
  background-repeat: no-repeat;
  background-position: right;
  @media (min-width: 851px) {
    max-width: ${(props) => (props.width ? props.width : '420px')};
  }
`;

export default FormsInputComponent;
