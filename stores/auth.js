import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      firstLoad: true,
      accessToken: null,
      refreshToken: null,
      user: null,
    };
  },
  getters: {
    isLoggedIn() {
      return this.accessToken !== null;
    },
  },
  actions: {
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
    },
    login(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      return fetch('https://margot.fullstacksyntra.be/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch user data');
          }

          return response.json();
        })
        .then((body) => {
          this.user = body.data;
          return this.user;
        });
    },
  },
});
