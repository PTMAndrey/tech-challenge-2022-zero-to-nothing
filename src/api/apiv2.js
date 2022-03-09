import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URLBase = "https://localhost:7103/";

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

const emptyUser = {
  id: "",
  firstName: "",
  lastName: "",
  photo: "",
  email: "",
  password: "",
  role: 0,
  status: "0",
  personalNumber: "",
  address: "",
  token: "",
};

var token = localStorage.getItem(token);

const getTokenBearer = async () => {
  token = localStorage.getItem("token");
  if (
    token != null &&
    token != "undefined" &&
    token != undefined &&
    token != "" &&
    token
  ) {
    return;
  }
  setTimeout(() => {
    getTokenBearer();
  }, 500);
};

const endpoint = `${URLBase}api/Authenticate/login`;

export const authAPI = {
  async login(email, password) {
    localStorage.clear();

    try {
      const body = {
        email: email,
        password: password,
      };

      console.log(JSON.stringify(body));
      await delay(5);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          accept: "*/*",
          // "Content-Type": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data;
      } else if (response.status === 400) {
        const error = await response.json();
        throw Error(error);
      } else {
        return emptyUser;
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
};
