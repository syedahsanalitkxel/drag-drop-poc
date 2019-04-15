export interface UserClientInterface {
  clientId: number;
  clientName: string;
  roles: string;
}

export default interface UserList {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userClients?: UserClientInterface[];
  id?: number;
}
