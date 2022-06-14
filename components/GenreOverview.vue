<template>
  <div class="homepage-container">
    <NuxtLink to="/games" v-for="tag in tags" :key="tag.id">
      <OverviewCard :class="'homepage-card'">
        <h2>{{ tag.tag }}</h2>
      </OverviewCard>
    </NuxtLink>
  </div>
</template>

<script>
import OverviewCard from './OverviewCard.vue';
export default {
  components: { OverviewCard },
  name: 'Test',
  data() {
    return {
      tags: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      fetch('https://margot.fullstacksyntra.be/items/tags', {
        method: 'GET',
        headers: {},
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch tags');
          }

          return response.json();
        })
        .then((body) => {
          this.tags = body.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
.homepage-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.homepage-card {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0;
  height: 250px;
  background-image: url(/assets/images/images/gaming.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  h2 {
    margin: 1rem 0;
    padding-bottom: 1rem;
  }
}
a {
  text-decoration: none;
  color: white;
}
</style>
