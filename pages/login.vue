<template>
  <div>
    <h1>Login</h1>
    <div>
      <FormKit
        v-model="loginData"
        type="form"
        submit-label="login"
        @submit="login"
      >
        <FormKit
          type="email"
          name="email"
          label="E-mail"
          validation="required"
        />
        <FormKit
          type="password"
          name="password"
          label="Password"
          validation="required"
        />
      </FormKit>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';
import '@formkit/themes/genesis';
import { useNotificationsStore } from '~/stores/notifications.js';

export default {
  name: 'Login',
  data() {
    return {
      authStore: useAuthStore(),
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  watch: {
    authStore: {
      handler(authStore) {
        if (authStore.isLoggedIn) {
          this.$router.push('/profile');
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addError', 'addMessage']),
    login(data) {
      document.getElementById('loader').classList.add('loader');
      fetch('https://margot.fullstacksyntra.be/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Can't login`);
          }

          return response.json();
        })
        .then((body) => {
          this.authStore
            .login(body.data.access_token, body.data.refresh_token)
            .then((user) => {
              this.addMessage(`Logged in as ${user.first_name}`);
            });
        })
        .catch((err) => {
          console.error(err);
          this.addError('Could not login, check email and password');
          this.authStore.logout();
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
  },
};
</script>

<style lang="scss"></style>
