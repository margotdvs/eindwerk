<template>
  <div>
    <h1>{{ game.name }}</h1>
    <div class="game-title-image">
      <img
        v-bind:src="
          'https://margot.fullstacksyntra.be/assets/' + game.title_image
        "
      />
    </div>
    <div class="game-description">
      <span>{{ game.description_short }}</span>
      <span class="game-score">Score {{ game.score }} / 10</span>
    </div>

    <div v-for="item in review" :class="'game-review'">
      <h3>{{ item.subtitle }}</h3>

      <div class="game-review-image">
        <img
          v-bind:src="'https://margot.fullstacksyntra.be/assets/' + item.image"
        />
      </div>
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
    <!-- <p>{{ $route.params.id }}</p> -->
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
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch(`https://margot.fullstacksyntra.be/items/games/${this.id}`, {
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
  line-height: 1.5rem;
  text-align: justify;
  margin-top: 1.5rem;
}

.game-score {
  font-weight: 700;
  font-size: 21px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

.game-title-image {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 25px;
    width: 100%;
  }
}

.game-review {
  display: flex;
  flex-direction: column;

  img {
    // width: 60%;
    width: 100%;
    border-radius: 25px;
  }

  span {
    // width: 60%;
    line-height: 1.5rem;
    text-align: justify;
  }
}

// .game-review:nth-of-type(even) {
//   .game-review-image {
//     display: flex;
//     justify-content: flex-end;
//   }

//   span {
//     display: flex;
//     justify-content: flex-end;
//   }
// }
</style>
