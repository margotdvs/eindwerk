<template>
  <div>
    <h1>Games Overview</h1>
    <div class="filters-container">
      <Filter />
    </div>
    <div class="cards-container">
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
      <OverviewCard></OverviewCard>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script>
import OverviewCard from "~~/components/OverviewCard.vue";
import Filter from "~~/components/Filter.vue";
export default {
  components: { OverviewCard, Filter },
  name: "Games",
};
</script>

<style lang="scss">
h1 {
  text-align: center;
  margin-bottom: 3.5rem;
}

.filters-container {
  margin-bottom: 3rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
