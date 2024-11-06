import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';


const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function handleApiError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(`${context}:`, {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
    });
    if (axiosError.response?.status === 401) {
      console.error('Authentication failed. ');
    }
  } else {
    console.error(`${context}:`, error);
  }
  throw error;
}

export async function sendEmailBatch(emails: {
  to: string;
  subject: string;
  attachments: { originalFilename: string; fileBuffer: string }[];
}[]) {
  try {
    const response = await api.post('/send_email', { emails });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error sending email batch');
    throw error;
  }
}
