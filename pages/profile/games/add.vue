<template>
  <div>
    <h1>Add Game</h1>

    <FormKit v-model="data" type="form" submit-label="Save">
      <FormKit
        type="text"
        name="title"
        label="Game title"
        validation="required"
      />
      <FormKit
        type="file"
        name="title_img"
        label="Title image"
        accept=".jpg, .jpeg .png"
        validation="required"
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
        name="short_description"
        label="Short description"
        maxlength="450"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script>
import { createInput } from '@formkit/vue';
import TagInput from '~/components/TagInput.vue';

definePageMeta({
  middleware: ['auth'],
});

export default {
  name: 'AddGame',
  data() {
    return {
      tagInput: createInput(TagInput),
      data: {
        title: 'test',
        title_img: '',
        score: '',
        tags: [1, 3],
        short_description: '',
      },
    };
  },
};
</script>

<style lang="scss">
.add-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
