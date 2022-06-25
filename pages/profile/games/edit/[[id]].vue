<template>
  <div>
    <h1>Edit Game</h1>

    <GameForm v-if="gameData" :game-data="gameData" />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';

export default {
  name: 'EditGame',
  data() {
    return {
      gameId: this.$route.params.id,
      gameData: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  created() {
    this.fetchGame();
  },
  methods: {
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
          return response.json();
        })
        .then((body) => {
          this.gameData = body.data;
          return body.data;
        })
        .catch((err) => {
          if (err.message === '401') {
            this.logout();
          }
          this.addError('Could not edit game, try again later?');
          console.error(err);
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
  },
};
</script>

<style scoped></style>
