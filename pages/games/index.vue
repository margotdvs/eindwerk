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
    <div id="pagination" class="pagination">
      <Btn id="prev" @click="prevBtnClicked">Previous</Btn>
      <Btn
        :class="'pagination-btn'"
        v-for="i in totalPages"
        :key="i"
        @click="pageClicked"
        >{{ i }}</Btn
      >
      <Btn id="next" @click="nextBtnClicked">Next</Btn>
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
      curPage: 1,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.getElementById('loader').classList.add('loader');

      let params = new URLSearchParams();

      params.append('limit', this.limit);
      params.append('page', this.curPage);
      params.append('meta', 'total_count');
      fetch(
        'https://margot.fullstacksyntra.be/items/games?' + params.toString(),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
          this.calculatePages();
          this.prevAndNextBtn();
        })
        .then(() => {
          if (this.curPage === 1) {
            document
              .getElementById('pagination')
              .children[1].classList.add('active');
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
    calculatePages() {
      this.totalPages = Math.ceil(this.totalItems / this.limit);
    },
    pageClicked(event) {
      let $target = event.target;

      this.curPage = parseInt($target.innerText);
      this.init();

      const btns = document.getElementById('pagination').children;

      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
      }
      $target.classList.add('active');
    },
    nextBtnClicked() {
      this.curPage++;
      this.init();

      const btn = document.getElementsByClassName('pagination-btn');

      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove('active');

        if (parseInt(btn[i].innerText) === this.curPage) {
          btn[i].classList.add('active');
        }
      }
    },
    prevBtnClicked() {
      this.curPage--;
      this.init();

      const btn = document.getElementsByClassName('pagination-btn');

      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove('active');

        if (parseInt(btn[i].innerText) === this.curPage) {
          btn[i].classList.add('active');
        }
      }
    },
    prevAndNextBtn() {
      if (this.curPage === 1) {
        document.getElementById('prev').classList.add('inactive');
      } else {
        document.getElementById('prev').classList.remove('inactive');
      }

      if (this.curPage === this.totalPages) {
        document.getElementById('next').classList.add('inactive');
      } else {
        document.getElementById('next').classList.remove('inactive');
      }
    },
  },
};
</script>

<style lang="scss">
.inactive {
  display: none;
}

.active {
  background: linear-gradient(to bottom, #e8edec, #d2d1d3);
  box-shadow: 0px 3px 20px 0px black;
  color: black;
}

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

  &-btn {
    margin: 0 0.5rem;
  }
}
</style>
