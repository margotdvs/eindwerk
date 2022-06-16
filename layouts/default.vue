<template>
  <div class="hero">
    <header>
      <Header />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style lang="scss">
.hero {
  max-width: 1200px;
  padding: 0 2rem;
  height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
}
</style>
