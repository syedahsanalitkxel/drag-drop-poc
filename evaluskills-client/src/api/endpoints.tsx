export const BASE_URL = 'http://10.0.0.217:7002/api/';
// export const BASE_URL = 'http://5c9223ebe7b1a00014078cc7.mockapi.io/api/v1/';
export const ASSESSMENTS = 'Items';
export const EMAIL = 'EmailTemplates';
export const CLIENTS = 'Clients';
export const USERS = 'Users';
export const INSTRUMENT_TEMPLATES = 'InstrumentTemplates';
export const LOGIN = 'Accounts/Login';
export const SELECT_CLIENT = 'Accounts/SelectClient';
export const RESET_PASSWORD = 'Accounts/ResetPassword';
export const CONFIRM_EMAIL = 'Accounts/ConfirmEmail';
export const LOOK_UPS = 'Lookups';
export const INSTRUCTIONS = 'Instructions';
export const EVALUATION = 'Evaluations';

export const START_EVALUATION = (token: string) => `${EVALUATION}/${token}/StartEvaluation`;
export const QUESTION_EVALUATION = (token: string) => `${EVALUATION}/${token}/SaveResult`;
export const FETCH_EVALUATION = (token: string, instrumentid: string, itemid: string) =>
  `${EVALUATION}/${token}/FetchItem/${instrumentid}/${itemid}`;
export const FETCH_SUMMARY = (token: string) => `${EVALUATION}/${token}/EvaluationReport`;
export const SUBMIT_EVALUATION = (token: string) => `${EVALUATION}/${token}/SubmitEvaluation`;
