export interface ContactInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export default interface ClientInterface {
  id: string;
  address?: string;
  billing?: string;
  city?: string;
  state?: string;
  zip?: string;
  school?: string;
  clientInformation?: string;
  clientName?: string;
  plan: string;
  noOfAssessments: string;
  noOfEvaluators: string;
  noOfParticipants: string;
  status: string;
  phone?: string;
  clientType?: string;
  contact?: ContactInterface[];
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
}
