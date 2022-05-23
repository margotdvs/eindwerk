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
  name: "DefaultLayout",
};
</script>

<style lang="scss">
.hero {
  width: 1200px;
}

// header {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }

footer {
  position: absolute;
  bottom: 0;
}

// main {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }
</style>
