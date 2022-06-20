<template>
  <div>
    <h1>Games Overview</h1>
    <div class="filters-container">
      <Filter />
    </div>
    <div class="cards-container">
      <OverviewCard v-for="game in games" :key="game.id">
        <div class="card-image">
          <img
            v-bind:src="
              'https://margot.fullstacksyntra.be/assets/' + game.title_image
            "
          />
        </div>
        <div class="card-mid">
          <h3>{{ game.name }}</h3>
          <span class="card-score">{{ game.score }} / 10</span>
          <span class="card-description">{{ game.description_short }}</span>
        </div>
        <NuxtLink :to="'/games/' + game.id" :class="'card-bottom'">
          <Btn>Read More</Btn>
        </NuxtLink>
      </OverviewCard>
    </div>
    <div class="pagination">
      <Btn>Previous</Btn>
      <Btn v-for="i in totalPages" :key="i">{{ i }}</Btn>
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
      totalItems: 0,
      limit: 8,
      totalPages: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch(
        'https://margot.fullstacksyntra.be/items/games?limit=8&page=1&meta=total_count',
        {
          method: 'GET',
          headers: {},
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch games');
          }

          return response.json();
        })
        .then((body) => {
          this.games = body.data;
          this.totalItems = body.meta.total_count;
          console.log(this.totalItems);
          this.calculatePages();
        })
        .catch((err) => {
          console.error(err);
        });
      // .finally(() => {
      //   document.body.classList.remove('loading');
      // });
    },
    calculatePages() {
      this.totalPages = Math.ceil(this.totalItems / this.limit);
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
  gap: 2rem 1rem;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
}

.card-image {
  width: 100%;
  height: 175px;
  img {
    width: 100%;
    height: 100%;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
  }
}

.card-mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.card-score {
  color: white;
  width: 100%;
  padding: 0 2rem;
  margin: 0;
  text-align: right;
}

.card-description {
  padding: 0 2rem;
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
