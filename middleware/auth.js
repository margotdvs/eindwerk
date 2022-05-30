import {defineNuxtRouteMiddleware} from 'nuxt/app';
import { useAuthStore } from '~/stores/auth.js';

export default defineNuxtRouteMiddleware((to, from) => {
  const {$pinia} = useNuxtApp();
  const authStore = useAuthStore($pinia);

  if (!authStore.isLoggedIn) {
    return '/login';
  }
});
