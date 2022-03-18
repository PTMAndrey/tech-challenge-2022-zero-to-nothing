import styled from "styled-components";
import React, { useState, useRef, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { RiCloseLine } from "react-icons/ri";
import endpoints from "../../api/endpoints";
import { nationalityConst } from "../../Assets/Constants/Constants";
import Title from "../ModalTitle/ModalTitle";
import LabelComponent from "../LabelComponent/LabelComponent";
import FormsInputComponent from "../FormsInputComponent/FormsInputComponent";
import DropDown from "../DropDown/DropDown";
import Footer from "../Footer/Footer";
import CancelButton from "../CancelButtonComponent/CancelButtonComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { ReactComponent as ShowIcon } from "../../Assets/show-password.svg";
import { ReactComponent as HideIcon } from "../../Assets/hide-password.svg";
import ReactTooltip from "react-tooltip";

const UserModal = (props) => {

  const classes = useStyles();
  const [showBorders, setShowBorders] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);

  //updating the useRef current value each time the input value is updated by entering text into the input field.
  const email = useRef();
  const password = useRef();
  const first_name = useRef();
  const last_name = useRef();
  const role = useRef();
  const gender = useRef();
  const birth_date = useRef();
  const nationality = useRef();
  const page = props.page;

  useEffect(() => {
  if (props.data !== undefined && showBorders === false) {
    console.log("props.data", props.data);
    email.current.value = props.data.Email;
    first_name.current.value = props.data.FirstName;
    last_name.current.value = props.data.LastName;
    // password.current.value = props.data.Password;
    // role.current.value = props.data.Role;
    
    role.current.value = props.data.Role;

    gender.current.value = props.data.Gender;
    //birth_date.current.value = props.data.BirthDate;
    nationality.current.value = props.data.Nationality;
    }
  }, [props]);


  const [errors, setErrors] = useState({
    email: [],
    password: [],
    first_name: [],
    last_name: [],
    role: [],
    gender: [],
    birth_date: [],
    nationality: [],
  });

  const handleEmailErrors = () => {
    let emailInput = email.current.value;
    if (emailInput === "") return "Email is a required field!";
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!re.test(emailInput)) return "Email is invalid";
    return " ";
  };

  const handlePasswordErrors = () => {
    let passwordInput = password.current.value;
    if (passwordInput === "") 
      return "Password is a required field!";
    
    return " ";
  };
  const handleFirstNameErrors = () => {
    let first_nameInput = first_name.current.value;
    if (first_nameInput === "") return "First Name is a required field!";
    let re = /^[a-zA-Z\s]*$/;
    if (!re.test(first_nameInput))
      return "First Name can contain only letters and spaces!";
    return " ";
  };

  const handleLastNameErrors = () => {
    let last_nameInput = last_name.current.value;
    if (last_nameInput === "") return "Last Name is a required field!";
    let re = /^[a-zA-Z\s]*$/;
    if (!re.test(last_nameInput))
      return "Last Name can contain only letters and spaces!";
    return " ";
  };

  const handleRoleErrors = () => {
    let roleInput = role.current.value;
    if(roleInput === "placeholder"&& page ==='edit')
     { role.current.value = props.data.Role;
      return " ";}
    if (roleInput === "placeholder") 
      return "Role is a required field!";
    
    return " ";
  };

  const handleGenderErrors = () => {
    let genderInput = gender.current.value;
    if( genderInput === "placeholder"){
      gender.current.value = props.data.Gender;
      return " ";
    }
    return 

  }
  

  const addUser = () => {
    fetch(endpoints.add_user, {
      method: 'POST',
      body: JSON.stringify({
        Email: email.current.value,
        Password: password.current.value,
        FirstName: first_name.current.value,
        LastName: last_name.current.value,
        Role: role.current.selectedIndex-1,
        Gender: gender.current.selectedIndex-1,
        //BirthDate: '2000-12-21',
       // Nationality: "Romanian",
        //BirthDate: birth_date.current.value,
        Nationality: nationality.current.selectedIndex-1,
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

  const editUser = () => {
    console.log('role', role.current.value);
    
    fetch(endpoints.update_user, {
      method: 'PUT',
      body: JSON.stringify({
        AccountId: props.data.AccountId,
        AccountStatus: props.data.AccountStatus,

        Email: email.current.value,
        // Password: props.data.Password,
        FirstName: first_name.current.value,
        LastName: last_name.current.value,
        Role: role.current.selectedIndex-1,
        Gender: gender.current.selectedIndex-1,
        BirthDate: props.data.BirthDate,
        RemotePercentage: props.data.RemotePercentage,
       // Nationality: "Romanian",
        //BirthDate: birth_date.current.value,
        Nationality: nationality.current.selectedIndex-1,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        console.log(response.json());
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
    console.log("am ajuns in handleerrors");
    setShowBorders(true);
    let error = {
      email: [],
      password: [],
      first_name: [],
      last_name: [],
      role: [],
      gender: []
    };

    let emailError ;
    if( page === "edit")
      emailError=" ";
    else
      emailError = handleEmailErrors();
    emailError !== " " && error.email.push(emailError);
    
    let passwordError;
    if( page === "edit")
      passwordError=" ";
    else
      passwordError = handlePasswordErrors();
    passwordError !== " " && error.password.push(passwordError);

    let first_nameError = handleFirstNameErrors();
    first_nameError !== " " && error.first_name.push(first_nameError);

    let last_nameError = handleLastNameErrors();
    last_nameError !== " " && error.last_name.push(last_nameError);

    let roleError= handleRoleErrors();
    roleError !== " " && error.role.push(roleError);

    if (
      error.email.length === 0 &&
      error.password.length === 0 &&
      error.first_name.length === 0 &&
      error.last_name.length === 0 &&
      error.role.length === 0
    ) {
      if ( page === "add") {
        addUser();
      } else {
        let genderError = handleGenderErrors();
        editUser();
      }
    }
    setErrors(error);
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
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
              <Title id="transition-modal-title">Edit User</Title>
            ) : (
              <Title id="transition-modal-title">Add User</Title>
            )}
            <hr />
            <InputsSideContainer>
              <InputsContainer>
                <LabelComponent htmlFor="first-name">First Name</LabelComponent>
                <FormsInputComponent
                  type="text"
                  id="first-name"
                  ref={first_name}
                  //defaultValue={props.FirstName}
                  error={showBorders && errors.first_name.length > 0}
                  validated={showBorders && errors.first_name.length === 0}
                  data-for="first_name"
                  data-tip={`${errors.first_name[0] ? errors.first_name : ""}`}
                />
                <ReactTooltip
                  id="first_name"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() =>
                    errors.first_name[0] ? errors.first_name : ""
                  }
                />
                <LabelComponent htmlFor="email">Email</LabelComponent>
                { page === "edit" ?
                <FormsInputComponent
                  id="email"
                  ref={email}
                  disabled
                  data-for="email"
                 />

                :
                <FormsInputComponent
                  type="text"
                  id="email"
                  ref={email}
                  error={showBorders && errors.email.length > 0}
                  validated={showBorders && errors.email.length === 0}
                  data-for="email"
                  data-tip={`${errors.email[0] ? errors.email : ""}`}
                />
                
                }
                <ReactTooltip
                  id="email"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() => (errors.email[0] ? errors.email : "")}
                />
              
              </InputsContainer>
              <InputsContainer>
              <LabelComponent htmlFor="last-name">Last Name</LabelComponent>
                <FormsInputComponent
                  type="text"
                  id="last-name"
                  ref={last_name}
                  error={showBorders && errors.last_name.length > 0}
                  validated={showBorders && errors.last_name.length === 0}
                  data-for="last_name"
                  data-tip={`${errors.last_name[0] ? errors.last_name : ""}`}
                />
                <ReactTooltip
                  id="last_name"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() =>
                    errors.last_name[0] ? errors.last_name : ""
                  }
                />
                {page === "edit" ? null : <div>
                <LabelComponent htmlFor="password">Password</LabelComponent>
                <PasswordInput>
                <FormsInputComponent
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  ref={password}
                  error={showBorders && errors.password.length > 0}
                  validated={showBorders && errors.password.length === 0}
                  data-for="password"
                  data-tip={`${errors.password[0] ? errors.password : ""}`}
                />
                {passwordShown ? (
                  <HideIcon onClick={passToggleHandler} />
                ) : (
                  <ShowIcon onClick={passToggleHandler} />
                )}
                </PasswordInput>
                <ReactTooltip
                  id="password"
                  type="error"
                  effect="solid"
                  place="right"
                  getContent={() => (errors.password[0] ? errors.password : "")}
                /></div>}
              </InputsContainer>
            </InputsSideContainer>

            
            <UnderContainer>
              <InputsSideContainer>
                <InputsContainer>
                  <LabelComponent>Role</LabelComponent>
                  <DropDown
                    name="role"
                    placeholder="placeholder"
                    ref={role}
                    error={showBorders && errors.role.length > 0}
                    validated={showBorders && errors.role.length === 0}
                    data-for="role"
                    data-tip={`${errors.role[0] ? errors.role : ""}`}
                  >
                    <option value="placeholder" hidden>
                      Role
                    </option>
                    <option value="Administrator">Administrator</option>
                    <option value="OfficeAdministrator">OfficeAdministrator</option>
                    <option value="Employee">Employee</option>
                  </DropDown>
                  <ReactTooltip
                    id="role"
                    type="error"
                    effect="solid"
                    place="right"
                    getContent={() => (errors.role[0] ? errors.role : "")}
                  />
                </InputsContainer>

                <InputsContainer>
                  <LabelComponent>Gender</LabelComponent>
                  <DropDown
                    name="gender"
                    ref={gender}
                    data-for="gender"
                  >
                    <option value="placeholder" hidden>
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </DropDown>
                  <ReactTooltip
                    id="gender"
                    type="error"
                    effect="solid"
                    place="right"
                  />
                </InputsContainer>

                {/* <InputsContainer>
                  <LabelComponent>BirthDate</LabelComponent>
                  <FormsInputComponent
                  type="date"
                  id="birth_date"
                  ref={birth_date}
                  data-for="birth_date"
                />
                  <ReactTooltip
                    id="birth_date"
                    type="error"
                    effect="solid"
                    place="right"
                  />
                </InputsContainer> */}

                <InputsContainer>
                  <LabelComponent>Nationality</LabelComponent>
                  <DropDown
                    name="nationality"
                    placeholder="placeholder"
                    ref={nationality}
                    data-for="nationality"
                  >
                    <option value="placeholder" hidden>
                      Nationality
                    </option>
                    {nationalityConst["nation"].map((elem,key) => (
                      <option key={key}>{elem}</option>
                    ))}
                  </DropDown>
                  <ReactTooltip
                    id="nationality"
                    type="error"
                    effect="solid"
                    place="right"
                  />
                </InputsContainer>
              </InputsSideContainer>
            </UnderContainer>
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
                onClick={() => handleErrors(page)}
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

export default UserModal;

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