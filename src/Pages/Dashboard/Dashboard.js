import { Helmet } from "react-helmet";
import { authAPI } from "../../api/apiv2";
import { Navigate } from "react-router-dom";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import endpoints from "../../api/endpoints";
import { useState, useEffect } from "react";

//styles
import styled from "styled-components";

//Form components
import FormTitle from "../../Components/Form/FormTitle/FormTitle";
import FormButton from "../../Components/Form/FormButton/FormButton";
import { device } from "../../Components/DevicesSize/Device";

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

const Dashboard = () => {
  const [data, setData] = useState();
  const [buildings, setBuildings] = useState([]);
  const [floor, setFloor] = useState([]);
  const [refresh, setRefresh] = useState();
  const [dataPending, setDataPending] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState(0);
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setDataPending(true);
    fetch(endpoints.get_buidings, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => handleGetBuildings(data));
  }, [refresh]);

  const handleGetBuildings = (data) => {
    console.log(data);
    setDataPending(false);
    setBuildings([...data]);
    console.log(buildings);
  };

  const onSubmit = async (data) => {
    console.log(data);
    return false;
  };

  let selectOptionsbuilding;
  let selectOptionsfloor;
  let selectOptionsoffices;

  const getInfo = () => {
    selectOptionsbuilding = [
      { value: "building1", label: "Building 1" },
      { value: "building2", label: "Building 2" },
      { value: "building3", label: "Building 3" },
    ];

    selectOptionsfloor = [
      { value: "floor1", label: "Floor 1" },
      { value: "floor2", label: "Floor 2" },
      { value: "floor3", label: "Floor 3" },
    ];

    selectOptionsoffices = [
      { value: "office1", label: "Office 1" },
      { value: "office2", label: "Office 2" },
      { value: "office3", label: "Office 3" },
    ];
  };

  const registerOptions = {
    building: { required: "Building is required" },
    floor: { required: "Floor is required" },
    offices: { required: "Offices is required" },
  };

  getInfo();
  // delay(10);

  return (
    <MainPage>
      {isValid ? <Navigate to="/offices" /> : null}
      <BackDropForm>
        <StyledLoginForm>
          <Helmet>
            <title>Tech Challenge | Login</title>
          </Helmet>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormTitle>Select the options</FormTitle>

              <Controller
                name="building"
                control={control}
                defaultValue=""
                rules={registerOptions.building}
                render={({ field }) => (
                  <Select options={buildings} {...field} />
                )}
              />

              <Controller
                name="floor"
                control={control}
                defaultValue=""
                rules={registerOptions.floor}
                render={({ field }) => (
                  <Select options={selectOptionsfloor} {...field} />
                )}
              />
              <Controller
                name="offices"
                control={control}
                defaultValue=""
                rules={registerOptions.offices}
                render={({ field }) => (
                  <Select options={selectOptionsoffices} {...field} />
                )}
              />
              <FormButton type="submit">Submit</FormButton>
            </form>
          </Container>
        </StyledLoginForm>
      </BackDropForm>
    </MainPage>
  );
};

export default Dashboard;

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
  max-height: 390px;
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
