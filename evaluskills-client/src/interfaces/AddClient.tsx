export default interface IAddClient {
  address: string;
  billing: string;
  city: string;
  state: string;
  zip: string;
  school: string;
  clientInformation: string;
  clientName: string;
  phone: string;
  clientType: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  }[];
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}
