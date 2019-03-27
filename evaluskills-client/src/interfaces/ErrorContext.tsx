import { ErrorObjectInterface } from './ErrorObject';

export interface ErrorContextInterface {
  error: ErrorObjectInterface;
  setError: (error: ErrorObjectInterface) => void;
}
