export interface Instructions {
  title?: string;
  instructions: string;
  id?: number;
}
export interface AddInstructionsInterface {
  title?: string;
  instructions?: any;
  isActive?: boolean;
  isSystemDefined?: boolean;
  clientId?: number;
  versionNo?: number;
}
export interface EditInstructionsInterface extends AddInstructionsInterface {
  id?: number;
}
