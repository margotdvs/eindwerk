<template>
  <div class="index-page">
    <h1 class="index-page__title">My index page</h1>
    <Test />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style lang="scss">
.index-page {
  // width: 1200px;

  &__title {
    color: $gold;
  }
}
</style>
