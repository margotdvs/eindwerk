import { useAuthStore } from '~/stores/auth.js';

export default defineNuxtRouteMiddleware((to) => {
  const { $pinia } = useNuxtApp();
  const authStore = useAuthStore($pinia);

  if (!authStore.firstLoad) {
    return;
  }

  let storageAuthStore = localStorage.getItem('authStore');
  if (storageAuthStore) {
    storageAuthStore = JSON.parse(localStorage.getItem('authStore'));
    authStore.refreshToken = storageAuthStore.refreshToken;
    console.log('after refreshtoken');
    authStore.accessToken = storageAuthStore.accessToken;
    console.log('after accessToken');
    authStore.user = storageAuthStore.user;
    console.log('after user');
  }

  authStore.firstLoad = false;

  if (to.path === '/login' && authStore.isLoggedIn) {
    return '/profile';
  }
});
