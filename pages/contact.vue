<template>
  <div>
    <h1>Contact</h1>
    <div class="contact-container">
      <div class="contact-left">
        <h3>About Us</h3>

        <div class="contact-left__image">
          <img src="~~/assets/images/contact_1.jpg" alt="" />
          <img src="~~/assets/images/contact_2.jpg" alt="" />
        </div>
        <p>
          Gamerviews is a website with reviews written by gamers for gamers.
        </p>
        <p>
          We know how important a good review is. After all, you don't want to
          spend a lot of money on a game you're never really going to play
          because it simply sucks.
        </p>
        <p>
          That's why we invented this website. So that you, as a gamer, can rely
          on an honest review and decide for yourself if it will be worth your
          money and time.
        </p>
        <p>
          Hope you enjoy the time on our website and remember:
          <span>No lollygaggin!</span>
        </p>
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
  padding-top: 4rem;

  @media screen and(max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
}

.contact-left {
  &__image {
    display: flex;
    margin-bottom: 1rem;

    img {
      width: 49%;
      margin-right: 0.55rem;
      border-radius: $border-radius;
    }
  }
  span {
    font-weight: 700;
    font-size: 19px;
  }

  p {
    margin: 1.5rem 0;
  }
}

.contact-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
