import styled from "styled-components";
import React, { useState, useRef, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { RiCloseLine } from "react-icons/ri";
import ReactTooltip from "react-tooltip";

// Components
import endpoints from "../../api/endpoints";
import Title from "../ModalTitle/ModalTitle";
import LabelComponent from "../LabelComponent/LabelComponent";
import FormsInputComponent from "../FormsInputComponent/FormsInputComponent";
import DropDown from "../DropDown/DropDown";
import Footer from "../Footer/Footer";
import CancelButton from "../CancelButtonComponent/CancelButtonComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const BuildingsModal = (props) => {
  const classes = useStyles();
  const [showBorders, setShowBorders] = useState(false);

  //updating the useRef current value each time the input value is updated by entering text into the input field.
  const name = useRef();
  const floorCount = useRef();
  const address = useRef();
  
  if (props?.data && !showBorders) {
    console.log(props.data.Name)
    name.current.value = props.data.Name;
    floorCount.current.selectedIndex = props.data.FloorCount;
    address.current.value = props.data.BuildingAddress;
  }

  const [errors, setErrors] = useState({
    name: [],
    floorCount: [],
    address: [],
  });

  const handleNameErrors = () => {
    let nameInput = name.current.value;
    if (nameInput === "") return "Name is a required field!";

    let re = /^[a-zA-Z0-9\s]*$/
    if (!re.test(nameInput))
      return "Name can contain only letters, numbers and spaces!";
    return " ";
  };

  const handleFloorInputErrors = () => {
    let floorInput = floorCount.current.value;
    if(props.page === "add" && floorInput === "placeholder") 
        return "Floor is a required field!";
    if(props.page === "edit" && floorInput === "placeholder")
        floorCount.current.selectedIndex = props.data.FloorCount;
    return " ";
  };

  const handleAddressErrors = () => {
    let addressInput = address.current.value;
    if (addressInput === "") return "Address is a required field!";
    if (addressInput.length < 10)
      return "Address must be longer then 10 characters!";
    if (addressInput.length > 150)
      return "Address maximum size is 150 character!";
    return " ";
  };

  const addBuilding = () => {
    fetch(endpoints.add_buildings, {
      method: 'POST',
      body: JSON.stringify({
        Name: name.current.value,
        FloorCount: floorCount.current.selectedIndex,
        BuildingAddress: address.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        response.json();
      })
      .then(
        () =>
          new Promise(() =>
            setTimeout(() => {
              props.refresh();
              props.handleClose();
            }, 5)
          )
      );
  };

  const editBuilding = () => {
    fetch(endpoints.update_buildings, {
      method: 'PUT',
      body: JSON.stringify({
        BuildingId: props.data.BuildingId,
        Name: name.current.value,
        FloorCount: floorCount.current.selectedIndex,
        BuildingAddress: address.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        response.json();
      })
      .then(
        () =>
          new Promise(() =>
            setTimeout(() => {
              props.refresh();
              props.handleClose();
            }, 5)
          )
      );
  };


  const handleErrors = (whereToSend) => {
    console.log("am ajuns in handle errors");
    setShowBorders(true);
    let error = {
      name: [],
      floorCount: [],
      address: [],
    };

    let nameError = handleNameErrors();
    nameError !== " " && error.name.push(nameError);

    let floorInputError = handleFloorInputErrors();
    floorInputError !== " " && error.floorCount.push(floorInputError);

    let addressError = handleAddressErrors();
    addressError !== " " && error.address.push(addressError);

    if (
      error.name.length === 0 &&
      error.floorCount.length === 0 &&
      error.address.length === 0
    ) {
      if (props.page === "add") {
        addBuilding();
      } else {
        editBuilding();
      }
    }
    setErrors(error);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      className={classes.modal}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 700,
      }}
    >
      <Slide in={props.open} direction="left">
        <Paper>
          <form onSubmit={handleErrors}>
            <ExitButton size={24} onClick={props.handleClose} />
            {props.edit === true ? (
              <Title id="transition-modal-title">Edit Building</Title>
            ) : (
              <Title id="transition-modal-title">Add Building</Title>
            )}
            <hr />
            <InputsSideContainer>
              <InputsContainer>
                <LabelComponent htmlFor="name">Name</LabelComponent>
                <FormsInputComponent
                  type="text"
                  id="name"
                  ref={name}
                  //defaultValue={props.FirstName}
                  error={showBorders && errors.name.length > 0}
                  validated={showBorders && errors.name.length === 0}
                  data-for="name"
                  data-tip={`${errors.name[0] ? errors.name : ""}`}
                />
                <ReactTooltip
                  id="name"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() => (errors.name[0] ? errors.name : "")}
                />

                <LabelComponent htmlFor="address">Address</LabelComponent>

                <FormsInputComponent
                  type="text"
                  id="address"
                  ref={address}
                  error={showBorders && errors.address.length > 0}
                  validated={showBorders && errors.address.length === 0}
                  data-for="address"
                  data-tip={`${errors.address[0] ? errors.address : ""}`}
                />

                <ReactTooltip
                  id="address"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() => (errors.address[0] ? errors.address : "")}
                />
              </InputsContainer>

              <InputsContainer>
                <LabelComponent>Floor</LabelComponent>
                <DropDown
                  name="floorCount"
                  placeholder="placeholder"
                  ref={floorCount}
                  error={showBorders && errors.floorCount.length > 0}
                  validated={showBorders && errors.floorCount.length === 0}
                  data-for="floorCount"
                  data-tip={`${errors.floorCount[0] ? errors.floorCount : ""}`}
                >
                  <option value="placeholder" hidden>
                    Floor
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </DropDown>
                <ReactTooltip
                  id="floorCount"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() =>
                    errors.floorCount[0] ? errors.floorCount : ""
                  }
                />
              </InputsContainer>
            </InputsSideContainer>
          </form>

          <div>
            <Footer color={"#F3F6F9"} right>
              <CancelButton
                type="submit"
                value="Cancel"
                onClick={() => props.handleClose()}
              />
              <ButtonComponent
                type="submit"
                onClick={() => handleErrors(props.page)}
              >
                Submit
              </ButtonComponent>
            </Footer>
          </div>
        </Paper>
      </Slide>
    </Modal>
  );
};

export default BuildingsModal;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(11, 37, 89, 0.3)",
  },
}));

const Paper = styled.div`
  background-color: white;
  padding: 40px 40px 0px 40px;
  height: 100vh;
  max-width: 854px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const ExitButton = styled(RiCloseLine)`
  margin-bottom: 25px;
  margin-top: -10px;
  cursor: pointer;
  width: 28px;
  height: 28px;
`; //'

const InputsSideContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;

  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const InputsContainer = styled.div`
  width: 100%;
  max-width: 374px;

  @media (max-width: 850px) {
    max-width: none;
  }
`;

const UnderContainer = styled.div`
  display: flex;
  flex-direction: column;
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
