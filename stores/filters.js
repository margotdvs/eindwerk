import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('notifications', {
  state: () => {
    return {
      tagsReady: false,
      tags: [],
      yearsReady: false,
      years: [],
      minScore: 1,
      maxScore: 10,
    };
  },
  getters: {},
  actions: {
    init() {
      return Promise.all([this.getTags(), this.getYears()]);
    },
    getYears() {
      if (this.yearsReady) {
        return Promise.resolve(this.years);
      }

      return fetch(
        'https://margot.fullstacksyntra.be/items/games?fields=release_year&groupBy=release_year&filter%5Brelease_year%5D%5B_nnull%5D=true&sort=release_year',
        {
          method: 'GET',
          headers: {},
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch years');
          }

          return response.json();
        })
        .then((body) => {
          const years = body.data.map((item) => item.release_year);

          this.years = years;
          this.yearsReady = true;
          return years;
        })
        .catch((err) => {
          console.error(err);
          return [];
        });
    },
    getTags() {
      if (this.tagsReady) {
        return Promise.resolve(this.tags);
      }

      return fetch(
        'https://margot.fullstacksyntra.be/items/tags?fields=id%2Ctag&sort=tag',
        {
          method: 'GET',
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch tags');
          }

          return response.json();
        })
        .then((body) => {
          this.tags = body.data;
          this.tagsReady = true;
          return body.data;
        })
        .catch((err) => {
          console.error(err);
          return [];
        });
    },
  },
});
