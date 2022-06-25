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
        v-model="review[index].image"
        :ignore="true"
        :type="imageInput"
        label="Image"
        inner-class="no-background"
      />
    </div>
    <div class="c-review-input__btns">
      <button type="button" class="btn" @click="addItem">Add item</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { createInput } from '@formkit/vue';
import { useAuthStore } from '~/stores/auth.js';
import ImageInput from '~/components/ImageInput.vue';

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
      imageInput: createInput(ImageInput),
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

<style lang="scss"></style>
