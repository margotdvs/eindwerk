<template>
  <div class="hero">
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style lang="scss">
.hero {
  height: 100%;
  max-width: 1200px;
  padding: 0 2rem;
}

main {
  position: relative;
  min-height: 85vh;
  width: 100%;
}
</style>
