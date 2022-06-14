<template>
  <div class="index-page">
    <h1 class="index-page__title">Welcome to Gamerviews!</h1>
    <div class="index-page__container">
      <img src="/assets/images/images/anigif.gif" class="index-image" />
      <span class="index-description"
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime nemo
        odio harum a, illo numquam eligendi magnam perferendis amet in facilis!
        Laboriosam quisquam dicta modi nesciunt ut a explicabo maxime!</span
      >
    </div>
    <h2>Genres</h2>
    <GenreOverview />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
};
</script>

<style lang="scss">
.index-page {
  width: 100%;

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    height: 100%;
    margin-bottom: 6rem;
  }
}

.index-image {
  border-radius: 25px;
}

.index-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5rem;
  text-align: center;
}
</style>
