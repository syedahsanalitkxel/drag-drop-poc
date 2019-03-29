import ErrorObjectInterface from './ErrorObject';

export default interface ErrorContextInterface {
  error: ErrorObjectInterface;
  setError: (error: ErrorObjectInterface) => void;
}
