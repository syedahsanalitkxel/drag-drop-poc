import RouteParamsInterface from '../interfaces/RouteParams';

export const isEdit = (params: RouteParamsInterface, path?: string) => {
  if (path) {
    return path.includes('edit') && params && params.id;
  }
  return params && params.id;
};

export const isAdd = (path: string) => path.includes('add');

export const isCopy = (path: string) => path.includes('copy');

export const isList = (path: string) => !path.includes('add') && !path.includes('edit') && !path.includes('copy');
