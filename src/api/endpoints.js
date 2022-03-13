const URLBase = "https://localhost:7103/api";

const endpoints = {
  base: URLBase,
  login: URLBase+"/Authenticate/login",
  add_user: URLBase+"/UserManagement/register-user",
  get_user: URLBase+"/UserManagement/get-user",
  get_users: URLBase+"/UserManagement/get-users",
  update_user: URLBase+"/UserManagement/update-user",
  activate_user: URLBase+"/UserManagement/update-activate-user",
  deactivate_user: URLBase+"/UserManagement/update-deactivate-user",
};

export default endpoints;
