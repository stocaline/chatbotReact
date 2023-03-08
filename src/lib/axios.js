import axios from "axios";

const URL = process.env.URL

export const api = axios.create({
    baseURL: URL,
  });