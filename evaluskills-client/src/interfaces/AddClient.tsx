export interface ContactInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export default interface AddClientInterface {
  address?: string;
  billing?: string;
  city?: string;
  state?: string;
  zip?: string;
  school?: string;
  clientInformation?: string;
  clientName?: string;
  phone?: string;
  clientType?: string;
  contact?: ContactInterface[];
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
}
