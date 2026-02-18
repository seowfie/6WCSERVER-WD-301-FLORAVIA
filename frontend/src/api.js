import axios from 'axios';

// Create the axios instance
const api = axios.create({
  // Use the environment variable we set in Vercel/Netlify
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
