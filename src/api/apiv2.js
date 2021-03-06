import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPending } from "./indexApi";

// const URLBase = "https://localhost:7103/";

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

const emptyUser = {
  id: "",
  status: "Inactive",
  birthdate: "",
  email: "",
  expiration: "",
  firstName: "",
  gender: "",
  lastName: "",
  nationality: "",
  remotePercentage: 0,
  role: "",
  token: "",
};

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  user: {
    id: "",
    status: localStorage.getItem("status"),
    birthdate: "",
    email: "",
    expiration: "",
    firstName: "",
    gender: "",
    lastName: "",
    nationality: "",
    remotePercentage: 0,
    role: localStorage.getItem("role"),
    token: "",
  },
};

// var token = localStorage.getItem(token);

// const getTokenBearer = async () => {
//   token = localStorage.getItem("token");
//   if (
//     token != null &&
//     token != "undefined" &&
//     token != undefined &&
//     token != "" &&
//     token
//   ) {
//     return;
//   }
//   setTimeout(() => {
//     getTokenBearer();
//   }, 500);
// };

//const endpoint = `${URLBase}api/Authenticate/login`;

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (payload, { dispatch }) => {
    try {
      //console.log(JSON.stringify(body));
      dispatch(setPending(true));
      await delay(5);
      const response = await fetch(payload.endpoint, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("name", data.FirstName + " " + data.LastName);
        localStorage.setItem("token", data.Token);
        localStorage.setItem("role", data.Role);
        localStorage.setItem("status", data.AccountStatus);
        localStorage.setItem("id", data.AccountId);

        dispatch(setPending(false));
        // payload.history.push('/');
        // payload.history("/");
        if (localStorage.getItem("status") === "Inactive") { 
          payload.history("/login");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("status");
          localStorage.removeItem("id");
          throw Error("This account has been deactivated! Contact your administrator!");
         
        } 
        else
         return data;
      } else if (response.status === 400) {
        dispatch(setPending(false));
        const error = await response.json();
        throw Error(error);
      } else if (response.status === 401) {
        dispatch(setPending(false));
        payload.history("/");
        const error = await response.json();

        throw Error("Invalid account! Check credentials once again!");
      } else {
        return emptyUser;
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "auth/addUser",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(payload.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });
      if (response.ok) {
        console.log("User added successfully");
        payload.history("/user");
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (payload, { dispatch }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("status");
      localStorage.removeItem("id");
      payload.history("/login");
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLocalUser(state, action) {
      state.user = action.payload;
    },
    setRole(state, action) {
      state.user.role = action.payload;
    },
    setStatus(state, action) {
      state.user.status = action.payload;
    },
    setToken(state, action) {
      state.user.token = action.payload;
    },
    setId(state, action) {
      state.user.id = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log(state.error);
      state.loading = false;
    },
    [addUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },

    [logoutUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
    },
    [logoutUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const { setLocalUser, setRole, setStatus, setToken, setId } =
  auth.actions;
export default auth.reducer;
