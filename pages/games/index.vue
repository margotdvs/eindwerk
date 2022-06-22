<template>
  <div class="games-overview">
    <h1>Games Overview</h1>
    <Filter />
    <div class="cards-container">
      <OverviewCard v-for="game in games" :key="game.id">
        <div class="card-image">
          <img
            :src="
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
    <Pagination :total-items="totalItems" :limit="limit" />
  </div>
</template>

<script>
import OverviewCard from '~/components/OverviewCard.vue';
import Filter from '~/components/Filter.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  name: 'Games',
  components: { Pagination, OverviewCard, Filter },
  data() {
    return {
      games: [],
      limit: 8,
      totalItems: 0,
    };
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        if (JSON.stringify(newRoute.query) === JSON.stringify(oldRoute.query)) {
          return;
        }

        return this.fetchGames();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    genQuery() {
      const urlSearchParams = new URLSearchParams();

      if (
        this.$route.query.release_year &&
        this.$route.query.release_year.length > 0
      ) {
        urlSearchParams.append(
          'filter[release_year][_in]',
          this.$route.query.release_year,
        );
      }

      if (this.$route.query.tags && this.$route.query.tags.length > 0) {
        urlSearchParams.append(
          'filter[tags][tags_id][_in]',
          this.$route.query.tags,
        );
      }

      if (this.$route.query.score && this.$route.query.score.length > 0) {
        urlSearchParams.append('filter[score][_in]', this.$route.query.score);
      }

      urlSearchParams.append('limit', this.limit);
      urlSearchParams.append('meta', 'filter_count');

      if (this.$route.query.page) {
        urlSearchParams.append('page', this.$route.query.page);
      }

      return urlSearchParams.toString();
    },
    fetchGames() {
      document.getElementById('loader').classList.add('loader');

      return fetch(
        'https://margot.fullstacksyntra.be/items/games?' + this.genQuery(),
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
          this.totalItems = body.meta.filter_count;
          return body.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
    init() {
      this.fetchGames();
    },
  },
};
</script>

<style lang="scss">
.active {
  @include background-btn;
  color: $black;
}

.games-overview {
  @media screen and(max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 2rem 1rem;

  @media screen and (max-width: 1050px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    width: 21rem;
  }
}

.card-image {
  width: 100%;
  height: 175px;
  img {
    width: 100%;
    height: 100%;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
  }
}

.card-mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.card-score {
  color: $white;
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

  .btn {
    margin: 0 0.5rem;
  }
}
</style>
