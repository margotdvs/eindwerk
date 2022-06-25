<template>
  <FormKit
    v-model="data"
    type="form"
    submit-label="Save"
    :disable="isUploadingFile"
    @submit="save"
  >
    <FormKit
      type="select"
      label="Status"
      name="status"
      :options="{
        draft: 'Draft',
        published: 'Published',
        archived: 'Archived',
      }"
    />
    <FormKit type="text" name="name" label="Game title" validation="required" />
    <FormKit
      inner-class="no-background"
      :type="imageInput"
      name="title_image"
      label="Title image"
    />
    <FormKit
      type="number"
      name="score"
      label="score"
      min="1"
      max="10"
      validation="required"
    />
    <FormKit
      inner-class="no-background"
      :type="tagInput"
      name="tags"
      label="Tags"
    />
    <FormKit
      type="number"
      name="release_year"
      label="release year"
      min="1900"
      max="2099"
      validation="required"
    />
    <FormKit
      type="textarea"
      name="description_short"
      label="Short description"
      maxlength="450"
      validation="required"
    />
    <FormKit
      :type="reviewInput"
      name="review"
      label="Review"
      inner-class="no-background"
    />
  </FormKit>
</template>

<script>
import { createInput } from '@formkit/vue';
import { mapState, mapActions } from 'pinia';
import TagInput from '~/components/TagInput.vue';
import ReviewInput from '~/components/ReviewInput.vue';
import ImageInput from '~/components/ImageInput.vue';
import { useAuthStore } from '~/stores/auth.js';
import { useNotificationsStore } from '~/stores/notifications.js';

export default {
  name: 'GameForm',
  props: {
    gameData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      tagInput: createInput(TagInput),
      reviewInput: createInput(ReviewInput),
      imageInput: createInput(ImageInput),
      data: this.initData(),
      isUploadingFile: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
    edit() {
      return !!this.gameData;
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addError', 'addMessage']),
    ...mapActions(useAuthStore, ['logout']),
    initData() {
      if (!this.gameData) {
        return {
          status: 'draft',
          name: '',
          title_image: '',
          score: '',
          tags: [],
          description_short: '',
          review: [],
          release_year: '',
        };
      }

      return this.gameData;
    },
    save(data) {
      document.getElementById('loader').classList.add('loader');

      return fetch(
        `https://margot.fullstacksyntra.be/items/games${
          this.edit ? '/' + this.gameData.id : ''
        }`,
        {
          method: this.edit ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => {
          if (response.status === 401) {
            throw new Error('401');
          }

          if (!response.ok) {
            throw new Error('Could not upload file');
          }

          if (!response.ok) {
            throw new Error('Could not upload file');
          }

          return response.json();
        })
        .then((body) => {
          console.log(body);
        })
        .catch((err) => {
          if (err.message === '401') {
            this.logout();
          }
          this.addError('Could not save game, try again later?');
          console.error(err);
        })
        .finally(() => {
          document.getElementById('loader').classList.remove('loader');
          this.$router.push('/games/' + this.$route.params.id);
        });
    },
  },
};
</script>

<style lang="scss">
.image-preview {
  padding-bottom: 1rem;
  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: $border-radius;
  }
}

.formkit-file-name {
  margin: 0 0.5rem 0 0;
}
</style>
