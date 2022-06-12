<template>
  <div class="card-container">
    <!-- <div>photo</div> -->
    <!-- <h3>Game title</h3> -->
    <!-- <span
      >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut deleniti
      expedita itaque accusantium commodi laudantium voluptatibus consequuntur
      fugiat modi unde, vero, natus amet blanditiis, beatae magnam dolore.
      Laudantium, maiores animi?</span
    >
    <NuxtLink to="/game">
      <Btn>Read More</Btn>
    </NuxtLink> -->
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
  padding: 1.5rem;
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
