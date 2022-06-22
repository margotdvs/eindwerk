<template>
  <div class="index-page">
    <h1 class="index-page__title">Welcome to Gamerviews!</h1>
    <div class="index-page__container">
      <img
        src="https://64.media.tumblr.com/21aebacdec25d8422fec84745f4795b2/tumblr_pprgd2Oz7f1tw2hyao1_400.gifv"
        class="index-image"
      />
      <div class="index-page__description">
        <span class="index-description">A website by gamers for gamers!</span>
        <span class="index-description">
          The ultimate place for reading honest reviews, exploring (new) games
          and even giving your own opinion on games. Everything, except for
          lollygaggin, <span>NO LOLLYGAGGIN! ⚔️</span>
        </span>
      </div>
      <img
        src="https://64.media.tumblr.com/01e3750e84d7eccd685c74938a5405eb/tumblr_pprgd2Oz7f1tw2hyao2_400.gifv"
        class="index-image"
      />
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
