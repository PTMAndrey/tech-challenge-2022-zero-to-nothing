import { FiGrid as DashboardIcon } from 'react-icons/fi';
import { FiUsers as UsersManagementIcon } from 'react-icons/fi';
import { BiBuildings as BuildingsManagementICon } from "react-icons/bi";
import { FiBriefcase as OfficeManagementIcon } from 'react-icons/fi';
import { GiDesk as OfficeStatusIcon } from "react-icons/gi";
import { GiOfficeChair as DeskAssignmentIcon } from "react-icons/gi";
import { FiSend as RemoteIcon } from 'react-icons/fi';
import { FiUser as UserStatusIcon } from 'react-icons/fi';


const items = [
  {
    route: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    roles: ['Administrator', 'OfficeAdministrator', 'Employee'],
  },
  {
    route: '/user',
    label: 'User',
    icon: <UsersManagementIcon />,
    roles: ['Administrator'],
  },
  {
    route: '/buildings',
    label: 'Buildings',
    icon: <BuildingsManagementICon />,
    roles: ['Administrator'],
  },
  {
    route: '/office',
    label: 'Office',
    icon: <OfficeManagementIcon />,
    roles: ['Administrator'],
  },
  {
    route: '/offices',
    label: 'Offices',
    icon: <OfficeStatusIcon />,
    roles: ['Administrator', 'OfficeAdministrator', 'Employee'],
  },
  {
    route: '/desk',
    label: 'Desk',
    icon: <DeskAssignmentIcon />,
    roles: ['Administrator', 'OfficeAdministrator'],
  },  
  {
    route: '/remote',
    label: 'Remote',
    icon: <RemoteIcon />,
    roles: ['Administrator', 'OfficeAdministrator', 'Employee'],
  },
  {
    route: '/users',
    label: 'Users',
    icon: <UserStatusIcon />,
    roles: ['Administrator', 'OfficeAdministrator', 'Employee'],
  },
];

export default items;
