import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

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

export const authAPI = {
  async login(email, password) {
    localStorage.clear();

    console.log(endpoints.login);

    try {
      const body = {
        email: email,
        password: password,
      };
      await delay(5);
      const response = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

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

export const get_Users = {
  async login() {
    try {
      await delay(5);
      const response = await fetch(endpoints.get_users, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

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
