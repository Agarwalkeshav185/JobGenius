
import axiosInstance from '../api/axiosInstance';
// Auth API functions
const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/user/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify email OTP
  verifyEmail: async (emailData) => {
    try {
      const response = await axiosInstance.post('/user/verifyEmail', emailData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user profile
  getUser: async () => {
    try {
      const response = await axiosInstance.get('/user/getUser');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await axiosInstance.get('/user/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/user/update/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update password
  updatePassword: async (passwordData) => {
    try {
      const response = await axiosInstance.put('/user/update/password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authService;