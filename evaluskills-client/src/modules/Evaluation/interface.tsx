export interface StartEvaluationInterface {
  instrumentId?: number | string;
  instrumentItemId?: number | string;
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
  token?: string;
}
export interface ItemElementOptions {
  id?: number;
  isSelected?: boolean;
  value?: number;
  title?: string;
  statement: string;
  behaviour: string;
  scaling: string;
}
export interface evaluationItemElements {
  id?: number;
  comments?: string;
  selectedValue?: number;
  selectedText?: string;
  evaluationItemElementId?: number;
  statusId?: number;
  title?: string;
  itemElementOptions: ItemElementOptions[];
}
export interface SelectedItemElement {
  selectedValue?: number;
  selectedText?: string;
  instrumentItemElementId?: number;
}
export interface QuestionSaveInterface {
  token?: string;
  instrumentId?: number | string;
  instrumentItemId?: number | string;
  isSkipped: boolean;
  comments: string;
  evaluationItemElements: SelectedItemElement[];
}
export interface QuestionEvaluationInterface {
  instrumentId?: number | string;
  instrumentTitle?: string;
  participantsId?: number;
  participantsFirstName?: string;
  participantsLastName?: string;
  participantsEmail?: string;
  participantRoleId?: 0;
  imagePath?: string;
  clientName?: string;
  overallScore?: number | string;
  itemElements: evaluationItemElements[];
  instrumentItemId?: number | string;
  comments?: string;
  totalNoOfEvaluationItems?: number;
  currentEvaluationItemNo?: number;
  progress: number;
  isCommentRequired?: boolean;
}
export interface items {
  comments?: string;
  selectedValue?: string;
  selectedText?: string;
  evaluationItemElementId?: number;
  statusId?: number;
  status?: string;
}
export interface Summary extends QuestionEvaluationInterface {
  evaluationItemElements: items[];
}
