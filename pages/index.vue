<template>
  <div class="index-page">
    <h1 class="index-page__title">Welcome to Gamerviews!</h1>
    <div class="index-page__container">
      <img
        src="https://64.media.tumblr.com/21aebacdec25d8422fec84745f4795b2/tumblr_pprgd2Oz7f1tw2hyao1_400.gifv"
        class="index-image"
      />
      <div class="index-page__description">
        <span class="index-description"
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime nemo
          odio harum a, illo numquam eligendi magnam perferendis amet in
          facilis! Laboriosam quisquam dicta modi nesciunt ut a explicabo
          maxime!</span
        >
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
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    // gap: 1rem;
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
  border-radius: 25px;
  margin-right: 0.25rem;
  height: 100%;
}

.index-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5rem;
  text-align: center;
  width: 50%;
}
</style>
