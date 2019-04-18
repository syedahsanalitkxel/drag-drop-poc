export interface ContactInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  clientId?: number;
}

export interface ClientUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default interface AddEditClientInterface {
  id?: number;
  clientName?: string;
  subsidiary?: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateId?: number;
  zip?: string;
  clientLogo?: File;
  billingPlanId?: number;
  phone?: string;
  clientTypeId?: number;
  billingPlanTitle?: string;
  noOfAssesments?: number;
  noOfParticipants?: number;
  noOfEvaluators?: number;
  isActivated?: false;
  clientContacts?: ContactInterface[];
  clientUser?: ClientUserInterface;
}
