<template>
  <div>
    <h1>{{ game.name }}</h1>
    <div class="info-container">
      <div class="tag-container">
        <div v-for="tag in tags" :key="tag.id" class="tag">
          <span> {{ tag.tags_id.tag }}</span>
        </div>
      </div>
      <div v-if="authStore.isLoggedIn" class="admin-tasks">
        <NuxtLink :to="'/profile/games/edit/' + this.id"
          ><Btn>Edit Game</Btn></NuxtLink
        >
      </div>
    </div>
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
        <div class="comment-info">
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
          label="Your comment"
          validation="required"
          id="comment"
        />
      </FormKit>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth.js';

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
      tags: [],
      authStore: useAuthStore(),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.getElementById('loader').classList.add('loader');
      fetch(
        `https://margot.fullstacksyntra.be/items/games/${this.id}?fields=*,comments.comment,*,tags.tags_id.tag`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
          this.tags = this.game.tags;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
    uploadComment(addComment) {
      document.getElementById('loader').classList.add('loader');
      console.log(addComment);
      const options = {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addComment),
      };

      fetch('https://margot.fullstacksyntra.be/items/comments', options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then((body) => {
          this.init();
          document.getElementById('comment').value = '';

          console.log(body);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
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

.comments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comments-container {
  margin-bottom: 2rem;
  border: 5px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  width: 50%;
  padding: 1.5rem;
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
    width: 100%;
    border-radius: 25px;
  }

  span {
    line-height: 1.5rem;
    text-align: justify;
  }
}

.info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-container {
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  display: flex;
}

.tag {
  border: 5px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  margin: 0 0.5rem;

  span {
    margin: 0.75rem 0;
  }
}
</style>
