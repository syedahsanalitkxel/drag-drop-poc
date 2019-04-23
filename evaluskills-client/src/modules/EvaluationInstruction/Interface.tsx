export interface Instructions {
  title?: string;
  instructions: string;
  id: number;
}
export interface InstructionsInterface {
  id?: number;
  title?: string;
  instructions?: any;
  isActive?: boolean;
  isSystemDefined?: boolean;
  clientId?: number;
  versionNo?: number;
}
