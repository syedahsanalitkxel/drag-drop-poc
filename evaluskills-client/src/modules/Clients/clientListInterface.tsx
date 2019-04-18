export interface ContactInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  clientId: number;
}

export interface ClientUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default interface ClientInterface {
  id: number;
  billingPlanTitle: string;
  clientName: string;
  clientLogo: string;
  noOfAssessments: number;
  noOfEvaluators: number;
  noOfParticipants: number;
  isActivated: boolean;
  phone: string;
  clientContact?: ContactInterface;
  clientUser?: ClientUserInterface;
}
