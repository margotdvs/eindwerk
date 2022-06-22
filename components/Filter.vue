<template>
  <div class="c-filters">
    <FormKit
      v-model="selectedFilters"
      form-class="$reset c-filters__form"
      type="form"
      submit-label="Filter"
      actions-class="c-filters__form-actions"
      submit-class="c-filters__form-submit"
      @submit="selectFilters"
    >
      <FormKit
        type="checkbox"
        outer-class="$reset c-filters__item"
        legend-class="$reset c-filters__item-legend"
        fieldset-class="$reset c-filters__item-fieldset"
        inner-class="$reset c-filters__item-checkbox"
        :options="tagOptions"
        name="tags"
        label="Genre"
      />
      <FormKit
        type="checkbox"
        outer-class="$reset c-filters__item"
        legend-class="$reset c-filters__item-legend"
        fieldset-class="$reset c-filters__item-fieldset"
        inner-class="$reset c-filters__item-checkbox"
        :options="yearOptions"
        name="release_year"
        label="Release Year"
      />
      <FormKit
        type="checkbox"
        outer-class="$reset c-filters__item"
        legend-class="$reset c-filters__item-legend"
        fieldset-class="$reset c-filters__item-fieldset"
        inner-class="$reset c-filters__item-checkbox"
        :options="scoreOptions"
        name="score"
        label="Score"
      />
    </FormKit>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { FormKit } from '@formkit/vue/index';
import { useFiltersStore } from '~/stores/filters.js';

export default {
  name: 'Filter',
  components: { FormKit },
  data() {
    return {
      filterStore: useFiltersStore(),
      selectedFilters: {
        tags: [],
        release_year: [],
        score: [],
      },
    };
  },
  computed: {
    ...mapState(useFiltersStore, [
      'tags',
      'tagsReady',
      'years',
      'yearsReady',
      'minScore',
      'maxScore',
    ]),
    tagOptions() {
      if (this.tags.length === 0) {
        if (this.tagsReady) {
          return { '': 'Could not find any genres' };
        }
        return { '': 'Loading' };
      }

      const tagOptions = [];
      this.tags.forEach((tag) => {
        tagOptions.push({ value: tag.id, label: tag.tag });
      });

      return tagOptions;
    },
    yearOptions() {
      if (this.years.length === 0) {
        if (this.yearsReady) {
          return { '': 'Could not find any years' };
        }
        return { '': 'Loading' };
      }

      return this.years;
    },
    scoreOptions() {
      const scoreOptions = [];
      for (let i = this.minScore; i <= this.maxScore; i++) {
        scoreOptions.push(i);
      }
      return scoreOptions;
    },
  },
  created() {
    this.filterStore.init().then(() => {
      this.selectFiltersFromUrl();
    });
  },
  methods: {
    selectFiltersFromUrl() {
      if (this.$route.query.release_year) {
        if (typeof this.$route.query.release_year === 'string') {
          this.selectedFilters.release_year = [
            parseInt(this.$route.query.release_year),
          ];
        }

        if (Array.isArray(this.$route.query.release_year)) {
          this.selectedFilters.release_year =
            this.$route.query.release_year.map((year) => parseInt(year));
        }
      }
      if (this.$route.query.tags) {
        if (typeof this.$route.query.tags === 'string') {
          this.selectedFilters.tags = [parseInt(this.$route.query.tags)];
        }

        if (Array.isArray(this.$route.query.tags)) {
          this.selectedFilters.tags = this.$route.query.tags.map((tagId) =>
            parseInt(tagId),
          );
        }
      }
      if (this.$route.query.score) {
        if (typeof this.$route.query.score === 'string') {
          this.selectedFilters.score = [parseInt(this.$route.query.score)];
        }

        if (Array.isArray(this.$route.query.score)) {
          this.selectedFilters.score = this.$route.query.score.map((score) =>
            parseInt(score),
          );
        }
      }
    },
    selectFilters(data) {
      const query = { ...this.$route.query, ...data };
      if (JSON.stringify(this.$route.query) === JSON.stringify(query)) {
        return;
      }

      query.page = 1;

      this.$router.push({ query });
    },
  },
};
</script>

<style lang="scss">
.dropdown-filter {
  @include background;
  border: $transparent;
  padding: 1rem;
  font-family: $font-family;
  font-weight: 700;
  font-size: 16px;
  color: $white;
}

.c-filters {
  margin-bottom: 3rem;

  &__form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 14rem 3rem;
    gap: 1rem;

    @media screen and(max-width: 600px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 11rem 3rem;
      gap: 1rem;
    }

    @media screen and(max-width: 550px) {
      display: flex;
      flex-direction: column;
    }
  }

  &__item {
    &-legend {
      display: block;
      position: absolute;
      top: 1rem;
    }

    &-fieldset {
      @include background;
      border: $transparent;
      padding: 3.5rem 1.5rem 1.5rem;
      font-family: $font-family;
      font-weight: 700;
      font-size: 20px;
      color: $white;
      position: relative;
      overflow: auto;
      height: 100%;
      scrollbar-color: #999 $transparent;

      &::-webkit-scrollbar {
        width: 10px; /* Mostly for vertical scrollbars */
        height: 10px; /* Mostly for horizontal scrollbars */
      }
      &::-webkit-scrollbar-thumb {
        /* Foreground */
        background: #999;
      }
      &::-webkit-scrollbar-track {
        /* Background */
        background: $transparent;
      }
    }

    &-checkbox {
      margin-right: 1rem;
      padding: 0.2rem 0;
    }
  }
}
</style>
