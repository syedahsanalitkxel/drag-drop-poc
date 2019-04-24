export interface StartEvaluationInterface {
  instrumentId?: number;
  instrumentTitle?: string;
  instructionId?: number;
  instructionTitle?: string;
  instructionDescription?: string;
  participantsId?: number;
  participantsFirstName?: string;
  participantsLastName?: string;
  participantsEmail?: string;
  participantRoleId?: number;
  imagePath?: string;
  clientName?: string;
  evaluationStatusId?: number;
}
export interface ItemElementOptions {
  id?: number;
  value?: number;
  title?: string;
  statement?: string;
  behaviour?: string;
  scaling?: string;
}
export interface evaluationItemElements {
  comments?: string;
  selectedValue?: number;
  selectedText?: string;
  evaluationItemElementId?: 0;
  statusId?: 0;
  ItemElementOptions?: ItemElementOptions[];
}
export interface QuestionEvaluationInterface {
  instrumentId?: number;
  instrumentTitle?: string;
  participantsId?: number;
  participantsFirstName?: string;
  participantsLastName?: string;
  participantsEmail?: string;
  participantRoleId?: 0;
  imagePath?: string;
  clientName?: string;
  overallScore?: 0;
  evaluationItemElements?: evaluationItemElements[];
}
