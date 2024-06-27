import { defineStore } from 'pinia';
import { login, register } from '../services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      const data = await login(email, password);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', data.token);
    },
    async register(name, email, password, role) {
      const data = await register(name, email, password, role);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', data.token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
    loadToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
      }
    },
  },
});
