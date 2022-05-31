<template>
  <div>
    <h1>Profile</h1>
    <div class="profile-container">
      <div class="profile-left"><div class="profile-image">image</div></div>
      <div class="profile-details">
        <FormKit type="form" submit-label="Edit">
          <FormKit
            type="text"
            name="username"
            label="Username"
            validation="required"
          />
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
          <FormKit
            type="password"
            name="newPassword"
            label="New Password"
            validation="required"
          />
        </FormKit>
      </div>
      <NuxtLink to="/add-game">
        <Btn>Add Game</Btn>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  setup() {
    definePageMeta({
      middleware: ["auth"],
    });
  },
};
</script>

<style lang="scss">
.profile-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.profile-left {
  display: flex;
  justify-content: center;
}

.profile-image {
  border-radius: 50%;
  height: 12rem;
  width: 12rem;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
