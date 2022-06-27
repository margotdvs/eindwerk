<template>
  <div>
    <NuxtLink :to="'/games/' + gameId">
      <Btn><span class="arrow">ᐸ</span> Back</Btn>
    </NuxtLink>
    <h1>Edit Game</h1>

    <GameForm v-if="gameData" :game-data="gameData" />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';
import { useNotificationsStore } from '~/stores/notifications.js';
import { mapActions } from 'pinia';

export default {
  name: 'EditGame',
  data() {
    return {
      gameId: this.$route.params.id,
      gameData: null,
      authStore: useAuthStore(),
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  created() {
    this.fetchGame();
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addError', 'addMessage']),
    ...mapActions(useAuthStore, ['logout']),
    fetchGame() {
      document.getElementById('loader').classList.add('loader');
      return fetch(
        `https://margot.fullstacksyntra.be/items/games/${this.gameId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )
        .then((response) => {
          if (response.status === 401) {
            throw new Error('401');
          }

          return response.json();
        })
        .then((body) => {
          this.gameData = body.data;
          return body.data;
        })
        .catch((err) => {
          console.error(err);
          if (err.message === '401') {
            this.$router.push('/games/' + this.gameId);
            this.authStore.logout();
          }

          this.addError('Could not edit game, try again later?');
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
  },
};
</script>

<style scoped></style>
