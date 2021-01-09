import api from './apiConfig';

export const getAllContests = async () => {
  const resp = await api.get('/contests');
  return resp.data;
};

export const getAllContestsWithUsers = async () => {
  const resp = await api.get('/contests/users');
  return resp.data;
};

export const getNewestContests = async () => {
  const resp = await api.get('/contests/newest');
  return resp.data;
};

export const getOldestContests = async () => {
  const resp = await api.get('/contests/oldest');
  return resp.data;
};

export const getOneContest = async (id) => {
  const resp = await api.get(`/contests/${id}`);
  return resp.data;
};

export const postContest = async (contestData) => {
  const resp = await api.post('/contests', { contest: contestData });
  return resp.data;
};

export const putContest = async (id, contestData) => {
  const resp = await api.put(`/contests/${id}`, {
    contest: contestData,
  });
  return resp.data;
};

export const destroyContest = async (id) => {
  const resp = await api.delete(`/contests/${id}`);
  return resp;
};
