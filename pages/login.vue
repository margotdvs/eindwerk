<template>
  <h1>Login</h1>
  <FormKit type="form" submit-label="login">
    <FormKit type="email" name="email" label="E-mail" validation="required" />
    <FormKit
      type="password"
      name="password"
      label="Password"
      validation="required"
    />
  </FormKit>
</template>

<script>
import "@formkit/themes/genesis";

export default {
  name: "Login",
};
</script>

<style lang="scss">
.formkit-inner {
  width: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
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
