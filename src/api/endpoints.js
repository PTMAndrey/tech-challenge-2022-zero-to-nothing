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
  
  get_buildings: URLBase+"/BuildingsManagement/get-buildings",
  get_building_by_name: URLBase+"/BuildingsManagement/get-building-by-name",
  add_buildings: URLBase+"/BuildingsManagement/add-buildings",
  update_buildings: URLBase+"/BuildingsManagement/update-buildings",
  delete_building: URLBase+"/BuildingsManagement/delete-building",

  

};

export default endpoints;
