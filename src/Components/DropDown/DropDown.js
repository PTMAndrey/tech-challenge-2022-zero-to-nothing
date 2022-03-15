import styled from 'styled-components';
import FilterIcon from '../../Assets/arrow-ios-down.svg';

const DropDown = styled.select`
  display: block;
  height: 46px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.error ? '#c57474' : p.validated ? '#00CB14' : '#62799d')};
  &:focus {
    outline: none;
    border: 1px solid #0499ff;
  }
  padding: 0px 16px;
  color: #62799d;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  background-color: white;
  outline: none;
  font-size: 14px;
  appearance: none;
  background-image: url(${FilterIcon});
  background-position: center right;
  background-repeat: no-repeat;
  cursor: pointer;

  @media (min-width: 851px) {
    max-width: 420px;
  }
`;

export default DropDown;
