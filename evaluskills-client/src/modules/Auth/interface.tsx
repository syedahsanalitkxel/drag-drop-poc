export interface AuthContextInterface {
  isAuthenticated: boolean;
  authenticate: (token: string, user: string) => void;
  checkAuthentication: () => boolean;
  logout: () => void;
}

export const defaultAuthContext = {
  authenticate: (token: string, user: string) => {},
  checkAuthentication: () => true,
  isAuthenticated: false,
  logout: () => {},
};
