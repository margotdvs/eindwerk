<template>
  <div>
    <h1>Add Game</h1>

    <GameForm />
  </div>
</template>

<script>
import GameForm from '~/components/GameForm';
definePageMeta({
  middleware: ['auth'],
});

export default {
  name: 'AddGame',
  components: { GameForm },
};
</script>

<style lang="scss">
// .add-form {
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
// }
</style>
