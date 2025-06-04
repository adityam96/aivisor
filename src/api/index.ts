import axios from 'axios';

// Base API URL - would be replaced with actual API URL in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      // Redirect to login page or dispatch logout action
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const authAPI = {
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    isCreator: boolean;
  }) => apiClient.post('/auth/register', userData),
  
  forgotPassword: (email: string) => 
    apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) => 
    apiClient.post('/auth/reset-password', { token, password }),
  
  getCurrentUser: () => 
    apiClient.get('/auth/me'),
};

export const toolsAPI = {
  getAllTools: (params?: {
    page?: number;
    limit?: number;
    sort?: string;
    category?: string;
    search?: string;
    pricing?: string;
  }) => apiClient.get('/tools', { params }),
  
  getToolById: (id: string) => 
    apiClient.get(`/tools/${id}`),
  
  getFreeTools: (params?: { page?: number; limit?: number }) => 
    apiClient.get('/tools/free', { params }),
  
  getNewTools: (params?: { page?: number; limit?: number }) => 
    apiClient.get('/tools/new', { params }),
  
  createTool: (toolData: any) => 
    apiClient.post('/tools', toolData),
  
  updateTool: (id: string, toolData: any) => 
    apiClient.put(`/tools/${id}`, toolData),
  
  deleteTool: (id: string) => 
    apiClient.delete(`/tools/${id}`),
};

export const reviewsAPI = {
  getReviewsByToolId: (toolId: string, params?: { page?: number; limit?: number }) => 
    apiClient.get(`/tools/${toolId}/reviews`, { params }),
  
  createReview: (toolId: string, reviewData: {
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    useCase: string;
  }) => apiClient.post(`/tools/${toolId}/reviews`, reviewData),
  
  updateReview: (reviewId: string, reviewData: any) => 
    apiClient.put(`/reviews/${reviewId}`, reviewData),
  
  deleteReview: (reviewId: string) => 
    apiClient.delete(`/reviews/${reviewId}`),
};

export const surveyAPI = {
  getQuestions: () => 
    apiClient.get('/survey/questions'),
  
  submitAnswers: (answers: Record<string, any>) => 
    apiClient.post('/survey/submit', { answers }),
  
  getRecommendations: (surveyId: string) => 
    apiClient.get(`/survey/${surveyId}/recommendations`),
};

export const messagesAPI = {
  getThreads: () => 
    apiClient.get('/messages/threads'),
  
  getThreadById: (threadId: string) => 
    apiClient.get(`/messages/threads/${threadId}`),
  
  createThread: (recipientId: string, message: string) => 
    apiClient.post('/messages/threads', { recipientId, message }),
  
  sendMessage: (threadId: string, content: string) => 
    apiClient.post(`/messages/threads/${threadId}`, { content }),
  
  markAsRead: (threadId: string) => 
    apiClient.put(`/messages/threads/${threadId}/read`),
};

export const blogAPI = {
  getPosts: (params?: { page?: number; limit?: number; category?: string }) => 
    apiClient.get('/blog/posts', { params }),
  
  getPostById: (id: string) => 
    apiClient.get(`/blog/posts/${id}`),
  
  createPost: (postData: any) => 
    apiClient.post('/blog/posts', postData),
  
  updatePost: (id: string, postData: any) => 
    apiClient.put(`/blog/posts/${id}`, postData),
  
  deletePost: (id: string) => 
    apiClient.delete(`/blog/posts/${id}`),
};

export default apiClient;
