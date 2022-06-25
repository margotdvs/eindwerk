<template>
  <div>
    <h1>Profile</h1>
    <div class="profile-container">
      <div class="profile-left"><div class="profile-image">image</div></div>
      <div class="profile-details">
        <FormKit type="form" submit-label="Edit" v-model="profileData">
          <FormKit
            type="text"
            name="first_name"
            label="Name"
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
          <!-- <FormKit
            type="password"
            name="newPassword"
            label="New Password"
            validation="required"
          /> -->
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth.js';
import { mapState } from 'pinia';

definePageMeta({
  middleware: ['auth'],
});

export default {
  name: 'Profile',
  data() {
    return {
      profileData: [],
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      return fetch(`https://margot.fullstacksyntra.be/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          this.profileData = body.data;
        })
        .catch((err) => {
          if (err.message === '401') {
            this.logout();
          }
          this.addError('Could not load profile, try again later?');
          console.error(err);
        });
    },
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
  border: 1px solid $white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and(max-width: 500px) {
    height: 10rem;
    width: 10rem;
  }
}
</style>
