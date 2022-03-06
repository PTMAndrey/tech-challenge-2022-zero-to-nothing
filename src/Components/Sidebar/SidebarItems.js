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
    roles: ['Administrator', 'Office Administrator', 'Employee'],
  },
  {
    route: '/users-management',
    label: 'Users Management',
    icon: <UsersManagementIcon />,
    roles: ['Administrator'],
  },
  {
    route: '/buildings-management',
    label: 'Buildings Management',
    icon: <BuildingsManagementICon />,
    roles: ['Administrator'],
  },
  {
    route: '/office-management',
    label: 'Office Management',
    icon: <OfficeManagementIcon />,
    roles: ['Administrator'],
  },
  {
    route: '/office-status',
    label: 'Office Status',
    icon: <OfficeStatusIcon />,
    roles: ['Administrator', 'Office Administrator', 'Employee'],
  },
  {
    route: '/desk-assignment',
    label: 'Desk Assignment',
    icon: <DeskAssignmentIcon />,
    roles: ['Administrator', 'Office Administrator'],
  },  
  {
    route: '/remote',
    label: 'Remote',
    icon: <RemoteIcon />,
    roles: ['Administrator', 'Office Administrator', 'Employee'],
  },
  {
    route: '/user-status',
    label: 'User Status',
    icon: <UserStatusIcon />,
    roles: ['Administrator', 'Office Administrator', 'Employee'],
  },
];

export default items;
