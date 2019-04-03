import RouteParamsInterface from '../interfaces/RouteParams';

export const isEdit = (params: RouteParamsInterface) => params && params.id;

export const isAdd = (path: string) => path.includes('add');

export const isList = (path: string) => !path.includes('add') && !path.includes('edit');
