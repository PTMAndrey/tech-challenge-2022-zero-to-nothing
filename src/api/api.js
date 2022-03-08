import axios from "axios";

const URLBase = "localhost:3000/";

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

    var res = await axios
      .post(`${URLBase}api/Authenticate/login`, {
        email: email,
        password: password,
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.Message == "Unauthorized");
          return { data: "", err: true };
        }
      });

    return res;
  },
};
