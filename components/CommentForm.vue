<template>
  <div>
    <FormKit type="form" submit-label="Submit">
      <!-- <FormKit type="text" name="username" label="Username" /> -->
      <FormKit type="textarea" name="comment" label="Comment" />
    </FormKit>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
};
</script>

<style lang="scss"></style>
