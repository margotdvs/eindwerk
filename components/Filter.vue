<template>
  <select class="dropdown-filter">
    <option value="" disabled selected>Genre</option>
    <option value="action">Action</option>
    <option value="adventure">Adventure</option>
    <option value="rpg">RPG</option>
    <option value="simulation">Simulation</option>
    <option value="strategy">Strategy</option>
  </select>
</template>

<script>
export default {
  name: "Filter",
};
</script>

<style lang="scss">
.dropdown-filter {
  border-radius: 25px;
  border: transparent;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 1rem;
  font-family: $font-family;
  font-weight: 700;
  font-size: 16px;
  color: white;
}
</style>
