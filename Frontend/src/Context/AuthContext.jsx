import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../Services/authServices';

// Create the context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in when app starts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await authService.getUser(); // API call to get user data
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token is invalid or expired:', error);
          // Clear invalid token
          localStorage.removeItem('authToken');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = (userData, token) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', token);
      // console.log('User logged in successfully:', userData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      // console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user data
  const updateUser = (newUserData) => {
    try {
      const updatedUser = { ...user, ...newUserData };
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Get authentication token
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is job seeker
  const isJobSeeker = () => {
    return user?.role === 'Job Seeker';
  };

  // Check if user is employer
  const isEmployer = () => {
    return user?.role === 'Employer';
  };

  const contextValue = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    getToken,
    hasRole,
    isJobSeeker,
    isEmployer,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};