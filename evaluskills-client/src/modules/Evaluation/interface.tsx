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
  ItemElementOptions: ItemElementOptions[];
}
export interface SelectedItemElement {
  selectedValue: number;
  selectedText: string;
  evaluationItemElementId: number;
}
export interface QuestionSave {
  instrumentId: number;
  evaluationItemId: number;
  isSkipped: boolean;
  comments: string;
  evaluationItemElements: SelectedItemElement[];
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

  itemElements: evaluationItemElements[];

  instrumentItemId?: number;
  comments?: string;
  totalNoOfEvaluationItems?: number;
  currentEvaluationItemNo?: number;
  progress: number;
  isCommentRequired?: boolean;
}
