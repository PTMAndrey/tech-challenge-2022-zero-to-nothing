import React from 'react';
import styled from 'styled-components';
import { RiSearchLine as SearchIcon } from 'react-icons/ri';
import {device} from '../DevicesSize/Device';
import FilterIcon from '../../Assets/arrow-ios-down-filter.svg';
import { titles } from '../../Assets/Constants/Constants';

const SearchBox = styled.input`
  width: 90%; //100%
  max-width: 660px;
  padding-left: 48px;
  height: 56px;
  padding-right: 10px; // 10px
  border: 1px solid #62799d;
  border-radius: 8px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  font-size: 14px;
  outline: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 763px;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left:5%;

  @media ${device.mobileM} {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 16px;
    justify-content: center;
  }
`;

const FilterBox = styled.select`
  border: 1px solid #62799d;
  color: #62799d;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-left: 16px;
  padding-right: 10px;
  width: 100%;
  //max-width: 102px;
  max-width: 25%;
  background-color: white;
  outline: none;
  font-size: 14px;
  appearance: none;
  background-image: url(${FilterIcon});
  background-position: center right;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Option = styled.option`
  background-color: white;
  color: #62799d;
  font-size: 14px;
  height: 50px;
  border-bottom: '1px red solid';
`;

const Item = styled.div`
  height: 24px;
  width: 24px;
  position: absolute;
  padding-left: 16px;
`;

const SearchIconDiv = styled.div`
  display: flex;
  align-items: center;
  max-width: 659px;
  width: 100%;

  @media ${device.mobileM} {
    max-width: none !important;
  }

  @media (max-width: 1175px) {
    max-width: 500px;
  }

  @media (max-width: 820px) {
    max-width: 250px;
  }
`;

const Searchbar = (props) => {
  const page = props?.page;
  return (
    <Container>
      <FilterBox
        name='selectList'
        id='selectList'
        placeholder='placeholder'
        onChange={props.filterChange}
      >
        <option value='placeholder' hidden>
          Filters
        </option>
        {titles[page]?.map((elem, key) => (
          <Option id={key} key={elem}>{elem.charAt(0).toUpperCase() + elem.slice(1)}</Option>
        ))}
      </FilterBox>
      <SearchIconDiv>
        <SearchBox
          type='search'
          placeholder='Search'
          onChange={props.searchChange}
        />
        <Item>
          <SearchIcon />
        </Item>
      </SearchIconDiv>
    </Container>
  );
};

export default Searchbar;
