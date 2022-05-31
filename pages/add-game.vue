<template>
  <div>
    <h1>Add Game</h1>

    <FormKit type="form" submit-label="Save"
      ><div class="add-form">
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
        <FormKit type="text" name="tags" label="Tags" />
        <FormKit
          type="textarea"
          name="short_description"
          label="Short description"
          maxlength="450"
          validation="required"
        />
        <FormKit
          type="file"
          name="images"
          label="Images"
          accept=".jpg, .jpeg .png"
          validation="required"
          multiple
        />
        <FormKit type="textarea" name="description" label="Game description" />
      </div>
    </FormKit>
  </div>
</template>

<script>
export default {
  name: "add-game",
};
</script>

<style lang="scss">
.add-form {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
