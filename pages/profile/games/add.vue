<template>
  <div>
    <h1>Add Game</h1>

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
      <FormKit
        type="text"
        name="name"
        label="Game title"
        validation="required"
      />
      <FormKit
        type="file"
        name="title_image"
        label="Title image"
        accept=".jpg, .jpeg .png"
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
    </FormKit>
  </div>
</template>

<script>
import { createInput } from '@formkit/vue';
import { mapState, mapActions } from 'pinia';
import TagInput from '~/components/TagInput.vue';
import { useAuthStore } from '~/stores/auth.js';

definePageMeta({
  middleware: ['auth'],
});

export default {
  name: 'AddGame',
  data() {
    return {
      tagInput: createInput(TagInput),
      data: {
        status: 'draft',
        title: '',
        title_image: [],
        score: '',
        tags: [],
        description_short: '',
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    uploadFile(file) {
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
    },
    save(data) {
      this.uploadFile(data.title_image[0])
        .then((fileId) => {
          data.title_image = fileId;
          return fetch('https://margot.fullstacksyntra.be/items/games', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify(data),
          });
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
    },
  },
};
</script>

<style lang="scss">
// .add-form {
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
// }
</style>
