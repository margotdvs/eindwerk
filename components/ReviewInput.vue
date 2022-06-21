<template>
  <div class="c-review-input">
    <div
      v-for="(reviewItem, index) in review"
      :key="'review__' + index"
      class="c-review-input__item"
    >
      <button
        type="button"
        class="c-review-input__item-remove"
        @click="remove(index)"
      >
        Remove
      </button>
      <FormKit
        v-model="review[index].subtitle"
        :ignore="true"
        type="text"
        label="Subtitle"
      />
      <FormKit
        v-model="review[index].text"
        :ignore="true"
        type="textarea"
        label="Text"
      />
      <FormKit
        :ignore="true"
        type="file"
        label="Image"
        :data-index="index"
        @change="uploadFile"
      />
    </div>
    <div class="c-review-input__btns">
      <button type="button" class="btn" @click="addItem">Add item</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';

export default {
  name: 'ReviewInput',
  components: {},

  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      review: this.initData(),
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  watch: {
    review: {
      handler(newReviewData) {
        this.context.node.input(newReviewData);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    initData() {
      return JSON.parse(JSON.stringify(this.context._value));
    },
    uploadFile(event) {
      document.getElementById('loader').classList.add('loader');

      const file = event.target.files[0];
      console.log(file);
      if (!file) {
        return Promise.resolve(null);
      }
      const body = new FormData();
      body.append('title', file.name);
      body.append('file', file);

      return fetch('https://margot.fullstacksyntra.be/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body,
      })
        .then((response) => {
          if (response.status === 401) {
            throw new Error('401');
          }

          if (!response.ok) {
            throw new Error('Could not upload file');
          }

          return response.json();
        })
        .then((body) => {
          this.review[event.target.dataset.index].image = body.data.id;
          return body.data.id;
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
        });
    },
    addItem() {
      this.review.push({
        subtitle: '',
        text: '',
        image: [],
      });
    },
    remove(index) {
      this.review.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.c-review-input {
  &__item {
    position: relative;
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem 0;

    &-remove {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      color: transparent;
      width: 1rem;
      height: 1rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;

      &:before,
      &:after {
        display: block;
        content: '';
        width: 2px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1px;
        margin-top: -5px;
        background-color: $blue-dark;
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
