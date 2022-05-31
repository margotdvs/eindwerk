<template>
  <div class="tag-input">
    <div v-if="addInputActive" class="tag-input__input-container">
      <input
        v-model="curInput"
        class="tag-input__input-field"
        type="text"
        @input="search"
      />
      <div class="tag-input__input-options">
        <button
          v-for="searchItem in searchResult"
          :key="searchItem.id"
          class="tag-input__input-option"
          type="button"
          @click="addExisting(searchItem)"
        >
          {{ searchItem.tag }}
        </button>

        <button
          v-if="curInput.length > 3"
          class="tag-input__input-option"
          type="button"
          @click="addNew"
        >
          Add "{{ curInput }}"
        </button>
      </div>
    </div>
    <div v-else class="tag-input__container">
      <button type="button" class="tag-input__item">3</button>
      <button type="button" class="tag-input__item">4</button>
      <button type="button" class="tag-input__item">5</button>
    </div>
    <div class="tag-input__btn-container">
      <button
        type="button"
        class="tag-input__add-btn"
        @click="toggleAddInputActive"
      >
        {{ addInputActive ? 'Cancel' : 'Add tag' }}
      </button>
      <button
        v-if="addInputActive"
        type="button"
        class="tag-input__save-btn"
        @click="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { curInput: '', addInputActive: false, searchResult: [] };
  },
  methods: {
    toggleAddInputActive() {
      this.addInputActive = !this.addInputActive;
    },
    addExisting(searchItem) {},
    addNew() {},
    save() {},
    search() {
      fetch(
        `https://margot.fullstacksyntra.be/items/tags?search=${this.curInput}&limit=5`,
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
    margin-left: -0.5rem;
    flex-wrap: wrap;
  }

  &__item {
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.5rem;
    box-shadow: none;
    border: none;
    cursor: pointer;
  }

  &__btn-container {
    display: flex;
    margin-left: -0.5rem;
    gap: 0.5rem;
  }

  &__add-btn,
  &__save-btn {
    margin-top: 0.5rem;
    display: block;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.5rem;
    box-shadow: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  &__input {
    &-container {
      width: calc(100% + 1rem);
      margin-left: -0.5rem;
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
    }

    &-field {
      display: block;
      width: 100%;
      box-shadow: none;
      border: none;
      outline: none;
      padding: 0.5rem 1rem;
      background-color: transparent;
    }

    &-options {
      display: flex;
      flex-direction: column;
    }

    &-option {
      background-color: transparent;
      border: none;
      outline: none;
      padding: 0.5rem;
      cursor: pointer;
      border-top: 1px solid rgba(255, 255, 255, 0.56);
    }
  }
}
</style>
