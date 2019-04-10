export interface ContactInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}
export interface AddEvaluator {
  paticipant: Participant;
  evaluator: Evaluator[];
}
export interface Participant {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
export interface Evaluator {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
export default interface EvaluationInterface {
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
  contact?: any;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  assessmentType?: string;
  newParticipant: AddEvaluator[];
}
