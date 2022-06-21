<template>
  <div v-show="totalItems > limit" class="pagination">
    <Btn v-if="curPage > 1" @click.native="prevPage">Previous</Btn>
    <Btn
      v-for="num in pageCount"
      :key="'page_' + num"
      :class="{ active: curPage === num }"
      @click.native="setPage(num)"
      >{{ num }}</Btn
    >
    <Btn v-if="curPage < pageCount" @click.native="nextPage">Next</Btn>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.limit);
    },
    curPage() {
      if (!this.$route.query.page) {
        return 1;
      }

      return parseInt(this.$route.query.page);
    },
  },
  methods: {
    prevPage() {
      if (this.curPage === 1) {
        return;
      }

      this.setPage(this.curPage - 1);
    },
    nextPage() {
      if (this.curPage === this.pageCount) {
        return;
      }

      this.setPage(this.curPage + 1);
    },
    setPage(pageNum) {
      const newQuery = { ...this.$route.query, page: pageNum };

      this.$router.push({ query: newQuery });
    },
  },
};
</script>

<style scoped></style>
