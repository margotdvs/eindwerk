<template>
  <div class="footer-container">
    <div class="footer-left">Gamerviews © Margot De Vos</div>
    <div>
      <NuxtLink
        to="https://www.facebook.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/facebook.png" />
      </NuxtLink>
      <NuxtLink
        to="https://www.instagram.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/instagram.png" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/linkedin.png" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer-container {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.footer-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
