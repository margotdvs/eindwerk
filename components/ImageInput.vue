<template>
  <div class="image-input">
    <div v-if="showTitleImagePreview" class="image-preview">
      <img
        :src="'https://margot.fullstacksyntra.be/assets/' + curFile[0].name"
        alt=""
      />
    </div>
    <FormKit
      v-model="curFile"
      :ignore="true"
      type="file"
      accept=".jpg, .jpeg, .png, .gif"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';
import { useNotificationsStore } from '~/stores/notifications.js';

export default {
  name: 'ImageInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      curFile: this.initVal(),
      isUploadingFile: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
    showTitleImagePreview() {
      return (
        this.curFile &&
        this.curFile[0] &&
        this.curFile[0].name &&
        !this.curFile[0].file
      );
    },
  },
  watch: {
    curFile(newFile, oldFile) {
      console.log({ newFile, oldFile });
      if (newFile[0] && newFile[0].file) {
        this.uploadFile();
      }
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addError']),
    initVal() {
      if (this.context.value) {
        return [{ name: this.context._value }];
      }
      return [];
    },
    uploadFile() {
      this.isUploadingFile = true;
      const body = new FormData();
      body.append('title', this.curFile[0].name);
      body.append('file', this.curFile[0].file);

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
          this.context.node.input(body.data.id);
          this.curFile = [{ name: body.data.id }];
          return body.data.id;
        })
        .catch((error) => {
          console.error(error);
          this.addError('Could not upload image, try a different image?');
          if (this.context._value) {
            this.curFile = [{ name: this.context._value }];
          } else {
            this.curFile = [];
          }
        });
    },
  },
};
</script>

<style lang="scss">
.image-input {
}
</style>
