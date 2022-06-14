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
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  text-align: center;
}

span {
  margin: 1rem 0;
}
</style>
