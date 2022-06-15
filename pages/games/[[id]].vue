<template>
  <div>
    <h1>{{ game.name }}</h1>
    <div>{{ game.title_image }}</div>
    <div class="game-description">
      <span>{{ game.description_short }}</span>
      <span class="game-score">Score {{ game.score }} / 10</span>
    </div>

    <div v-for="item in review" :class="'game-review'">
      <div>{{ item.image }}</div>
      <h3>{{ item.subtitle }}</h3>
      <span> {{ item.text }} </span>
    </div>

    <div>
      <h2>Comments</h2>
      <div class="comments-container">
        <div class="comment-image">Image</div>
        <div class="comment-info">
          <span class="comment-username">Username</span>
          <span>Comment user</span>
        </div>
      </div>
    </div>
    <p>{{ $route.params.id }}</p>
    <CommentForm />
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      game: [],
      review: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch('https://margot.fullstacksyntra.be/items/games/14', {
        method: 'GET',
        headers: {},
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch game');
          }

          return response.json();
        })
        .then((body) => {
          this.game = body.data;
          console.log(this.game);
          this.review = this.game.review;
          console.log(this.review);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
.game-description {
  display: grid;
  grid-template-columns: 70% 30%;
  margin-bottom: 2rem;
}

.game-score {
  text-align: center;
  font-weight: 700;
  font-size: 21px;
  color: white;
}

h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.comments-container {
  display: grid;
  grid-template-columns: 20% 80%;
  margin-bottom: 3rem;
}

.comment-image {
  text-align: center;
}

.comment-info {
  display: flex;
  flex-direction: column;
}

.comment-username {
  margin-top: 0;
}

// .game-review {
//   display: flex;
//   flex-direction: column;
// }
</style>
