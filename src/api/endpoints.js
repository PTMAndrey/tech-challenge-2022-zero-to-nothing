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
  get_buildings: URLBase+"/Building/get-buildings",
  get_building_by_name: URLBase+"/Building/get-building-by-name",
  add_buildings: URLBase+"/Building/add-buildings",
  update_buildings: URLBase+"/Building/update-buildings",
  delete_building: URLBase+"/Building/delete-building",

  

};

export default endpoints;
