<template>
  <NuxtLayout name="default" class="default">
    <NuxtPage />
    <Notifier />
  </NuxtLayout>
  <span id="loader"></span>
</template>

<script>
import Notifier from '~/components/Notifier.vue';
import { useAuthStore } from '~/stores/auth.js';

export default {
  components: { Notifier },
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  watch: {
    authStore: {
      handler(authStore) {
        if (authStore.firstLoad) {
          return;
        }

        console.log('after first load');
        localStorage.setItem('authStore', JSON.stringify(authStore));
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.default {
  width: 100vw;
  height: 100%;
}
</style>
