import api from "./apiConfig";

export const getAllVotes = async () => {
  const resp = await api.get("/votes");
  return resp.data;
};

export const getOneVote = async (id) => {
  const resp = await api.get(`/votes/${id}`);
  return resp.data;
};

export const postVote = async (voteData) => {
  const resp = await api.post("/votes", { vote: voteData });
  return resp.data;
};

export const destroyVote = async (id) => {
  const resp = await api.delete(`/votes/${id}`);
  return resp;
};