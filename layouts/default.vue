<template>
  <div>
  <header>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <NuxtLink to="/page-2">
      Page Two
    </NuxtLink>
  </header>

  <main>
    <slot/>
  </main>

  <footer>
    Ik ben een footer
  </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style></style>
