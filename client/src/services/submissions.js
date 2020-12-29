import api from "./apiConfig";

export const getAllSubmissions = async () => {
  const resp = await api.get("/submissions");
  return resp.data;
};

export const getOneSubmission = async (id) => {
  const resp = await api.get(`/submissions/${id}`);
  return resp.data;
};

export const postSubmission = async (submissionData) => {
  const resp = await api.post("/submissions", { submission: submissionData });
  return resp.data;
};

export const putSubmission = async (id, submissionData) => {
  const resp = await api.put(`/submissions/${id}`, {
    submission: submissionData,
  });
  return resp.data;
};

export const destroySubmission = async (id) => {
  const resp = await api.delete(`/submissions/${id}`);
  return resp;
};
