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
        email: 'korneel.eeckhout@gmail.com',
        password: 'JNbEj27usbGzUhvZlAwh',
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
        });
    },
  },
};
</script>

<style lang="scss">
.formkit-inner {
  width: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  box-shadow: none;

  &:focus-within {
    border: none;
    box-shadow: none;
  }

  &.no-background {
    background-color: transparent;
    display: block;
    padding: 0;
  }
}

.formkit-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.formkit-label {
  font-family: $font-family;
}

.formkit-outer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.formkit-wrapper {
  width: 100%;
}
</style>
