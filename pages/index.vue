<template>
  <div class="index-page">
    <h1 class="index-page__title">Welcome to Gamerviews!</h1>
    <div class="index-page__container">
      <div>
        <img
          src="https://64.media.tumblr.com/a445483bb6eedf68152935c23fd5c418/2eb0e00491038893-da/s540x810/67a1315e11165391f23243beb8ee60c3bb21cd3c.gifv"
          class="index-image"
        />
        <!-- <img
          src="https://64.media.tumblr.com/16005a2892d8db12290d92a947896f48/8b7c5c78e6e942de-9f/s540x810/3eb420f3abe584377598ee9d521760e7bc0289b8.gifv"
          class="index-image"
        /> -->
      </div>
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
  margin-right: 0.25rem;
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
