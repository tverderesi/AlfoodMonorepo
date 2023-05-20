import axios from "axios";

export const httpv1 = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.REACT_APP_SERVER_ENDPOINT
  }/api/v1/`,
});

export const httpv2 = axios.create({
  baseURL: "http://localhost:8000/api/v2/",
});
