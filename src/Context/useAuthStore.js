// Context/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = "http://localhost:8000";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      username: null,
      email: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      //  Signup function
      createUser: async (email, password, username) => {
        set({ loading: true, error: null });

        try {
          const response = await axios.post(`${API_URL}/auth/signup`, {
            username,  // ⚠️ Backend expects 'username', not 'name'
            email,
            password,
          });

          // Success - save token
          const { access_token, token_type } = response.data;
          
          set({
            token: access_token,
            username,
            email,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return true; // Success
        } catch (error) {
          const errorMessage =
            error.response?.data?.detail || "Signup failed. Please try again.";
          
          set({
            loading: false,
            error: errorMessage,
          });

          console.error("Signup error:", errorMessage);
          return false; // Failed
        }
      },

      //  Login function
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          });

          const { access_token, username } = response.data;

          set({
            token: access_token,
            username,
            email,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return true;
        } catch (error) {
          const errorMessage =
            error.response?.data?.detail || "Login failed. Please try again.";

          set({
            loading: false,
            error: errorMessage,
          });

          console.error("Login error:", errorMessage);
          return false;
        }
      },

      //  Logout function
      logout: () => {
        set({
          token: null,
          username: null,
          email: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },

      //  Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        token: state.token,
        username: state.username,
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);