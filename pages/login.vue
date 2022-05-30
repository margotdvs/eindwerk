<template>
  <div>
    <h1>Login</h1>
    <div>
      <FormKit type="form" submit-label="login" @submit="login">
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
import { useAuthStore } from "~/stores/auth.js";
import "@formkit/themes/genesis";

export default {
  name: "Login",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    login(data) {
      fetch("https://margot.fullstacksyntra.be/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`Can't login`);
          }

          return response.json();
        })
        .then((body) => {
          console.log(body);
          this.authStore.login(body.data.access_token, body.data.refresh_token).then(() => {
            this.$router.push('/profile');
          }) ;
        })
        .catch((err) => {
          console.error(err);
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
