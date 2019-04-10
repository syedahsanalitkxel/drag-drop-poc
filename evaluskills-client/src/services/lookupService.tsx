import API from '../api';
import { LOOK_UPS } from '../api/endpoints';

const api = new API();

export const fetchLookups = () => api.get(LOOK_UPS);
