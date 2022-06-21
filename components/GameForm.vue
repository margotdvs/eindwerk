<template>
  <FormKit v-model="data" type="form" submit-label="Save" @submit="save">
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
      type="file"
      name="title_image"
      label="Title image"
      accept=".jpg, .jpeg, .png, .gif"
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
import { useAuthStore } from '~/stores/auth.js';

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
    const gameData = this.gameData
      ? this.gameData
      : {
          status: 'draft',
          name: '',
          title_image: [],
          score: '',
          tags: [],
          description_short: '',
          review: [],
        };

    return {
      tagInput: createInput(TagInput),
      reviewInput: createInput(ReviewInput),
      data: gameData,
      edit: !!this.gameData,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    uploadFile(file) {
      // document.getElementById('loader').classList.add('loader');

      if (!file) {
        return Promise.resolve(null);
      }
      const body = new FormData();
      body.append('title', file.name);
      body.append('file', file.file);

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
          return body.data.id;
        });
      // .finally(() => {
      //   document.getElementById('loader').classList.remove('loader');
      // });
    },
    save(data) {
      // document.getElementById('loader').classList.add('loader');

      this.uploadFile(data.title_image[0])
        .then((fileId) => {
          data.title_image = fileId;
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
          );
        })
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
          console.error(err);
        });
      // .finally(() => {
      //   document.getElementById('loader').classList.remove('loader');
      // });
    },
  },
};
</script>

<style scoped></style>
