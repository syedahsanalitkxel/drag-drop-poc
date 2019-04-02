import RouterPropsInterface from '../interfaces/RouterPropsInterface';

export const isEdit = (params: RouterPropsInterface) => params && params.id;

export const isAdd = (path: string) => path.includes('add');

export const isList = (path: string) => !path.includes('add') && !path.includes('edit');
