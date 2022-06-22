<template>
  <div class="tag-input">
    <div v-if="addInputActive" class="tag-input__input-container">
      <input
        v-model="curInput"
        class="tag-input__input-field"
        type="text"
        @input="search"
        @keydown.enter.prevent
      />
      <div class="tag-input__input-options">
        <button
          v-for="searchItem in searchResult"
          :key="'searchResult' + searchItem.id"
          class="tag-input__input-option"
          type="button"
          @click="addExisting(searchItem)"
        >
          {{ searchItem.tag }}
        </button>

        <button
          v-if="curInput.length > 2"
          class="tag-input__input-option"
          type="button"
          @click="addNew"
        >
          Add "{{ curInput }}"
        </button>
      </div>
    </div>
    <div v-else class="tag-input__container">
      <button
        v-for="selectedTag in selectedTags"
        :key="'selectedTag' + selectedTag.id"
        type="button"
        class="tag-input__item"
        @click="removeItem(selectedTag.id)"
      >
        {{ selectedTag.tag }}
      </button>
    </div>
    <div class="tag-input__btn-container">
      <button
        type="button"
        class="tag-input__add-btn"
        @click="toggleAddInputActive"
      >
        {{ addInputActive ? 'Cancel' : 'Add tag' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '~/stores/auth.js';
import { useNotificationsStore } from '~/stores/notifications.js';

export default {
  name: 'TagInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTags: [],
      curInput: '',
      addInputActive: false,
      searchResult: [],
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(useAuthStore, ['accessToken']),
    selectedTagIds() {
      return this.selectedTags.map((selectedTag) => selectedTag.id);
    },
    searchQueryParams() {
      const queryParams = new URLSearchParams();
      queryParams.append('search', this.curInput);
      queryParams.append('limit', 5);
      if (this.selectedTags.length > 0) {
        queryParams.append('filter[id][_nin]', this.selectedTagIds);
      }

      return queryParams.toString();
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addError']),
    removeItem(id) {
      this.selectedTags = this.selectedTags.filter(
        (selectedTag) => selectedTag.id !== id,
      );

      this.formKitInput();
    },
    init() {
      const params = new URLSearchParams();
      params.append('filter[id][_in]', this.context._value);

      fetch(
        'https://margot.fullstacksyntra.be/items/tags?' + params.toString(),
        {
          method: 'GET',
          headers: {},
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch tags');
          }

          return response.json();
        })
        .then((body) => {
          this.selectedTags = body.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    formKitInput(item) {
      if (item) {
        this.selectedTags.push(item);
        this.curInput = '';
        this.addInputActive = false;
        this.searchResult = [];
      }

      const copyTagIds = [...this.selectedTagIds];
      this.context.node.input(copyTagIds);
    },
    toggleAddInputActive() {
      this.addInputActive = !this.addInputActive;
    },
    addExisting(searchItem) {
      this.formKitInput(searchItem);
    },
    addNew() {
      // document.getElementById('loader').classList.add('loader');
      fetch('https://margot.fullstacksyntra.be/items/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          tag: this.curInput,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          if (body.errors) {
            body.errors.forEach((errorMessage) => {
              if (errorMessage.extensions.code === 'RECORD_NOT_UNIQUE') {
                this.addError(`${this.curInput} already exists`);
              }
            });

            return;
          }
          this.formKitInput(body.data);
        })
        .catch((err) => {
          console.error(err);
        });
      // .finally(() => {
      //   document.getElementById('loader').classList.remove('loader');
      // });
    },
    search() {
      // document.getElementById('loader').classList.add('loader');

      if (this.curInput.length === 0) {
        this.searchResult = [];
        return;
      }

      fetch(
        `https://margot.fullstacksyntra.be/items/tags?${this.searchQueryParams}`,
        {
          method: 'GET',
          headers: {},
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('could not find tags');
          }

          return response.json();
        })
        .then((body) => {
          this.searchResult = body.data;
        })
        .catch((err) => {
          console.error(err);
          this.searchResult = [];
        });
      // .finally(() => {
      //   document.getElementById('loader').classList.remove('loader');
      // });
    },
  },
};
</script>

<style lang="scss">
.tag-input {
  width: 100%;
  &__container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__item {
    @include background;
    padding: 0.5rem;
    box-shadow: none;
    border: none;
    cursor: pointer;
  }

  &__btn-container {
    display: flex;
    gap: 0.5rem;
  }

  &__add-btn,
  &__save-btn {
    @include background;
    margin-top: 0.5rem;
    display: block;
    padding: 0.5rem;
    box-shadow: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  &__input {
    &-container {
      @include background;
    }

    &-field {
      display: block;
      width: 100%;
      box-shadow: none;
      border: none;
      outline: none;
      padding: 0.5rem 1rem;
      background-color: $transparent;
    }

    &-options {
      display: flex;
      flex-direction: column;
    }

    &-option {
      background-color: $transparent;
      border: none;
      outline: none;
      padding: 0.5rem;
      cursor: pointer;
      border-top: 1px solid rgba(255, 255, 255, 0.56);
    }
  }
}
</style>
