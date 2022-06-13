<template>
  <div>
    <h1>Game Title</h1>
    <div class="game-description">
      <span
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, illum.
        Eveniet laborum ipsa sequi. Dolorem doloremque officiis impedit maxime
        exercitationem hic illo architecto rem alias. Nam corrupti accusamus
        quisquam odit.</span
      >
      <span class="game-score">Score / 10</span>
    </div>
    <div>
      <h2>Comments</h2>
      <div class="comments-container">
        <div class="comment-image">Image</div>
        <div class="comment-info">
          <span class="comment-username">Username</span>
          <span>Comment user</span>
        </div>
      </div>
    </div>
    <CommentForm />
  </div>
</template>

<script>
export default {
  name: 'Game',
};
</script>

<style lang="scss">
.game-description {
  display: grid;
  grid-template-columns: 70% 30%;
  margin-bottom: 2rem;
}

.game-score {
  text-align: center;
  font-weight: 700;
  font-size: 21px;
}

h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.comments-container {
  display: grid;
  grid-template-columns: 20% 80%;
  margin-bottom: 3rem;
}

.comment-image {
  text-align: center;
}

.comment-info {
  display: flex;
  flex-direction: column;
}

.comment-username {
  margin-top: 0;
}
</style>
