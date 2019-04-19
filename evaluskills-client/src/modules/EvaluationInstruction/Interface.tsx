export interface Instructions {
  title?: string;
  instructions?: string;
  id?: number;
}
export interface AddInstructionsInterface {
  title?: string;
  instructions?: string;
  isActive?: boolean;
  isSystemDefined?: boolean;
  clientId?: boolean;
}
export interface EditInstructionsInterface extends AddInstructionsInterface {
  id?: number;
}
