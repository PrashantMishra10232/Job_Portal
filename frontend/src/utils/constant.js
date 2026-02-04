// Get the base API URL from environment variables
// VITE_API_BASE_URL should be set in .env file for local or in Render dashboard for production
// For local: http://localhost:8000
// For production: https://chakriportal.onrender.com (or your actual backend URL)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const USER_API_ENDPOINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_ENDPOINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_ENDPOINT = `${API_BASE_URL}/api/v1/company`;
export const INTERVIEW_API_ENDPOINT = `${API_BASE_URL}/api/v1/admin`;
