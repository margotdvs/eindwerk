<template>
  <div class="footer-container">
    <div class="footer-left">Gamerviews © Margot De Vos</div>
    <div>
      <NuxtLink
        to="https://www.facebook.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/facebook.png" alt="" />
      </NuxtLink>
      <NuxtLink
        to="https://www.instagram.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/instagram.png" alt="" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="~~/assets/images/linkedin.png" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
.footer-container {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and(max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.footer-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
