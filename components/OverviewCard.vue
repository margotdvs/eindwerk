<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OverviewCard',
};
</script>

<style lang="scss">
.card-container {
  @include background;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  margin: 1rem 0;
}
</style>
