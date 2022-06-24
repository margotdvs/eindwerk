<template>
  <NuxtLayout name="default" class="default">
    <Header />
    <NuxtPage />
    <Notifier />
    <Footer class="footer" />
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
  width: 100%;
  min-height: 100%;
}

#__nuxt {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  top: 0;
  position: absolute;
}

.footer {
  position: absolute;
  bottom: -8rem;
}
</style>
