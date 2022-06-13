<template>
  <div>
    <h1>Games Overview</h1>
    <div class="filters-container">
      <Filter />
    </div>
    <div class="cards-container">
      <OverviewCard v-for="game in games" :key="game.id">
        <div class="card-mid">
          <div class="card-image">{{ game.title_image }}</div>
          <h3>{{ game.name }}</h3>
          <span>{{ game.description_short }}</span>
        </div>
        <NuxtLink
          :to="{ name: 'game', params: { id: game.id } }"
          :class="'card-bottom'"
        >
          <Btn>Read More</Btn>
        </NuxtLink>
      </OverviewCard>
    </div>
    <div class="pagination">
      <Btn>Previous</Btn>
      <Btn>1</Btn>
      <Btn>2</Btn>
      <Btn>Next</Btn>
    </div>
  </div>
</template>

<script>
import OverviewCard from '~~/components/OverviewCard.vue';
import Filter from '~~/components/Filter.vue';
export default {
  components: { OverviewCard, Filter },
  name: 'Games',
  data() {
    return {
      games: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch('https://margot.fullstacksyntra.be/items/games', {
        method: 'GET',
        headers: {},
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch games');
          }

          return response.json();
        })
        .then((body) => {
          this.games = body.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
  margin-bottom: 3rem;
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

.card-image {
  border-radius: 25px;
}

.card-mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.card-bottom {
  position: fixed;
  bottom: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
</style>
