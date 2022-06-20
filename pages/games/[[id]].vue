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

    <div class="comments">
      <h2>Comments</h2>
      <div class="comments-container" v-for="comment in comments">
        <!-- <div class="comment-image">Image</div> -->
        <div class="comment-info">
          <!-- <span class="comment-username">Username</span> -->
          <span>{{ comment.comment }}</span>
        </div>
      </div>
    </div>
    <div>
      <FormKit
        v-model="addComment"
        type="form"
        submit-label="Submit"
        @submit="uploadComment"
      >
        <FormKit
          type="textarea"
          name="comment"
          label="Comment"
          validation="required"
        />
      </FormKit>
      {{ addComment }}
    </div>
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
      comments: [],
      addComment: {
        game_id: this.$route.params.id,
        comment: '',
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch(
        `https://margot.fullstacksyntra.be/items/games/${this.id}?fields=*,comments.*`,
        {
          method: 'GET',
          headers: {},
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch game');
          }

          return response.json();
        })
        .then((body) => {
          this.game = body.data;
          this.review = this.game.review;
          this.comments = this.game.comments;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    uploadComment(addComment) {
      console.log(addComment);
      const options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {},
        body: addComment,
      };

      fetch('https://margot.fullstacksyntra.be/items/comments', options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
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

.comments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comments-container {
  // display: grid;
  // grid-template-columns: 20% 80%;
  margin-bottom: 2rem;
  border: 5px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  width: 50%;
  padding: 1rem;
}

// .comment-image {
//   text-align: center;
// }

.comment-info {
  display: flex;
  flex-direction: column;
}

// .comment-username {
//   margin-top: 0;
//   text-align: center;
// }

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
    width: 100%;
    border-radius: 25px;
  }

  span {
    line-height: 1.5rem;
    text-align: justify;
  }
}
</style>
