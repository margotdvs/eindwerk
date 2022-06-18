<template>
  <div class="footer-container">
    <NuxtLink
      to="https://www.facebook.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img src="/assets/images/facebook.png" />
    </NuxtLink>
    <NuxtLink
      to="https://www.instagram.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img src="/assets/images/instagram.png" />
    </NuxtLink>
    <NuxtLink
      to="https://www.linkedin.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img src="/assets/images/linkedin.png" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer-container {
  padding: 4rem 0 0;
  display: flex;
  /* justify-content: space-between; */
}
</style>
