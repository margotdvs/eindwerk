<template>
  <div class="header-container">
    <div class="logo">Gamerviews</div>
    <div class="nav">
      <NuxtLink :class="'nav-item'" to="/"> Home </NuxtLink>
      <NuxtLink :class="'nav-item'" to="/page-2"> Page Two </NuxtLink>
      <NuxtLink :class="'nav-item'" to="/contact"> Contact </NuxtLink>
    </div>
    <div class="nav">
      <NuxtLink :class="'nav-item'" to="/"> Login </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
.header-container {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  margin: 4rem 0 0 0;
}

.logo {
  padding: 0 2rem;
  color: white;
}

.nav {
  // padding: 0 2rem;

  &-item {
    text-decoration: none;
    color: white;
    font-weight: 700;
    padding: 12px 16px;
    margin: 0 8px;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      transition: 0.2s;
      border-radius: 25px;
    }
    &:hover {
      &::before {
        background: linear-gradient(to bottom, #e8edec, #d2d1d3);
        box-shadow: 0px 3px 20px 0px black;
        transform: scale(1.2);
      }
      color: black;
    }
  }
}
</style>
