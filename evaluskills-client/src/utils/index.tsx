import { userType } from '../enums';

function checkRole(role: string) {
  const rawUser = localStorage.getItem('user');

  if (rawUser) {
    const parsedUser = JSON.parse(rawUser);
    return parsedUser.roles && parsedUser.roles[0] === role;
  }
  return false;
}

export const getActiveClient = () => {
  const rawUser = localStorage.getItem('user');

  if (rawUser) {
    const parsedUser = JSON.parse(rawUser);
    return parsedUser.activeClientId;
  }
};

export const USER_ROLE = {
  isClientAdmin: () => checkRole(userType.CLIENT_ADMIN),
  isSuperAdmin: () => checkRole(userType.SUPER_ADMIN),
};
