function checkRole(role: string) {
  const rawUser = localStorage.getItem('user');

  if (rawUser) {
    const parsedUser = JSON.parse(rawUser);
    return parsedUser.roles && parsedUser.roles[0] === role;
  }
  return false;
}

export const USER_ROLE = {
  isClientAdmin: () => checkRole('ClientAdmin'),
  isSuperAdmin: () => checkRole('SuperAdmin'),
};
