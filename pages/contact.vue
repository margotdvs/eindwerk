<template>
  <div>
    <h1>Contact</h1>
    <div class="contact-container">
      <div class="contact-left">
        <h3>About Us</h3>

        <div class="contact-left__image">
          <img
            src="https://64.media.tumblr.com/501527ec499a6cbf61079240c3d8a9b4/tumblr_nwtvr53yWg1up7w6go1_500.jpg"
          />
          <img
            src="https://64.media.tumblr.com/28f43a715547490b90bfdd1f082e4a96/tumblr_nwtvr53yWg1up7w6go2_500.jpg"
          />
        </div>
        <span
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          necessitatibus, ea deleniti recusandae cum aut repellendus fugiat
          dolore doloremque non quis. Laborum possimus a eius mollitia,
          aspernatur minima officiis cumque.</span
        >
      </div>
      <div class="contact-right">
        <h3>Give us your feedback!</h3>
        <FormKit type="form" submit-label="Send">
          <FormKit type="email" label="Your e-mailadress" />
          <FormKit type="textarea" label="Your feedback" />
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
  gap: 2rem;
  padding-top: 6rem;
}

.contact-left {
  &__image {
    display: flex;
    margin-bottom: 1rem;

    img {
      width: 50%;
      margin-right: 0.5rem;
      border-radius: 25px;
    }
  }
}

.contact-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
