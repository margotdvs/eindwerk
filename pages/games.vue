<template>
  <div>
    <h1>Games Overview</h1>
    <div class="cards-container">
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
    </div>
  </div>
</template>

<script>
import OverviewCard from "~~/components/OverviewCard.vue";
export default {
  components: { OverviewCard },
  name: "Games",
};
</script>

<style lang="scss">
h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
</style>
