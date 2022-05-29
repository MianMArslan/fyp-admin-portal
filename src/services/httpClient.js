import axios from "axios";

const httpClient = axios.create({
  baseURL: `http://localhost:4001/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const httpFileUpload = axios.create({
  baseURL: `http://localhost:4001/`,
  headers: {
    "content-type": "multipart/form-data",
  },
  withCredentials: true,
});

export async function GET(url, params) {
  try {
    const response = await httpClient.get(url, params);
    return response.data.data;
  } catch (error) {
    return error?.response;
  }
}

export async function POST(url, params) {
  try {
    const response = await httpClient.post(url, params);
    return response.data;
  } catch (error) {
    return error?.response;
  }
}

export async function DELETE(url, params) {
  try {
    const response = await httpClient.delete(url, params);
    return response.data;
  } catch (error) {
    return error?.response;
  }
}

export async function UPDATE(url, params) {
  try {
    const response = await httpClient.put(url, params);
    return response.data;
  } catch (error) {
    return error?.response;
  }
}

export async function UPLOADFILE(url, params) {
  try {
    const response = await httpFileUpload.post(url, params);
    return response.data;
  } catch (error) {
    return error?.response;
  }
}
