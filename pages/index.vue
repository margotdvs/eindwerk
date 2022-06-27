<template>
  <div class="index-page">
    <h1 class="index-page__title">Welcome to Gamerviews!</h1>
    <div class="index-page__container">
      <img src="~~/assets/images/homepage_1.webp" class="index-image" alt="" />
      <div class="index-page__description">
        <span class="index-description">A website by gamers for gamers!</span>
        <span class="index-description">
          The ultimate place for reading honest reviews, exploring (new) games
          and even giving your own opinion on games. Everything, except for
          lollygaggin, <span>NO LOLLYGAGGIN! ⚔️</span>
        </span>
      </div>
      <img src="~~/assets/images/homepage_2.webp" class="index-image" alt="" />
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}

.index-image {
  border-radius: $border-radius;

  @media screen and(max-width: 800px) {
    display: none;
  }
}

.index-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 70%;
  font-weight: 700;

  span {
    margin: 0;
    font-size: 18px;
  }
}
</style>
