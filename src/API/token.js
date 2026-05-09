import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function validateToken() {
  try {
    const response = await axios.get(`${API}/token/validateToken`);

    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
}

export async function saveToken(token) {
  try {
    const response = await axios.post(
      `${API}/token/saveToken`,
      { token },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );

    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
}
