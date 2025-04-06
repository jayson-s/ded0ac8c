import axios from 'axios';

const API = axios.create({
  baseURL: 'https://aircall-api.onrender.com',
});

export const getActivities = () => API.get('/activities');
export const getCallDetails = (id) => API.get(`/activities/${id}`);
export const updateCallArchiveStatus = (id, isArchived) =>
  API.patch(`/activities/${id}`, { is_archived: isArchived });
export const resetAllCalls = () => API.patch('/reset');