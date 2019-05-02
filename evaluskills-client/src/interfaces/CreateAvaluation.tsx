export interface ContactInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}
export interface AddEvaluator {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId?: number;
  evaluators: Evaluator[];
}
export interface Evaluator {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId?: number;
}
export interface Reminder {
  emailTemplateId?: number;
  reminderDate: string;
}
export default interface EvaluationInterface {
  title: string;
  instructionVersionId?: number;
  instrumentTemplateId?: number;
  clientId?: number;
  testTypeId?: number;
  instrumentApplicationId?: number;
  recomendedApplicationId?: number;
  allowParticipantsToAddEvaluators: boolean;
  dueDate: string;
  minEvaluationsPerParticipant?: number;
  participantsInvitationEmailTemplateId?: number;
  evaluatorsInvitationEmailTemplateId?: number;
  sendInstrument: boolean;
  participants: AddEvaluator[];
  reminders: Reminder[];
  instructions: [];
  participantsInvitationEmailTemplates: [];
  evaluatorInvitationEmailTemplates: [];
  reminderTemplates: [];
}
