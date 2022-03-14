const URLBase = "https://localhost:7103/api";

const endpoints = {
  base: URLBase,
  login: URLBase + "/Authenticate/login",
  add_users: URLBase + "/UserManagement/register-user",
  get_users: URLBase + "/UserManagement/get-users",
  update_user: URLBase + "/UserManagement/update-user",
  get_buidings: URLBase + "/Building/get-buildings",
};

export default endpoints;
