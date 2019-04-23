export interface AddEmailInterface {
  title?: string;
  body?: any;
  emailTypeId?: string;
  isSystemDefined?: boolean;
  subject?: string;
  editorState?: any;
  componentName: string;
}
export interface EmailListingInterface {
  body?: string;
  clientId?: number;
  title: string;
  emailTypeId: number;
  subject: string;
  isSystemDefined?: boolean;
  id: number;
}

export interface EmailFiterInterface {
  title?: string;
  emailTypeId?: string;
  pageSize?: number;
  totalRecords?: number;
  pageNumber?: number;
}
