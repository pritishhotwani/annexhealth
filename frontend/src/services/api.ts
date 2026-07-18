import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function chat(message: string) {
  const response = await api.post("/chat", {
    message,
  });

  return response.data.response;
}

export default api;