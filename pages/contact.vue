<template>
  <div>
    <h1>Contact</h1>
    <div class="contact-container">
      <div class="contact-left">
        <h3>About Us</h3>
        <span
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          necessitatibus, ea deleniti recusandae cum aut repellendus fugiat
          dolore doloremque non quis. Laborum possimus a eius mollitia,
          aspernatur minima officiis cumque.</span
        >
      </div>
      <div class="contact-right">
        <FormKit type="form" submit-label="Send">
          <FormKit type="textarea" label="Give us your feedback" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
};
</script>

<style lang="scss">
.contact-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-top: 6rem;
}
</style>
