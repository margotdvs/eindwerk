<template>
  <div class="c-notifier">
    <div
      v-for="notification in notStore.openNotifications"
      :key="notification.id"
      class="c-notifier__item"
      :class="`c-notifier__item--${notification.type}`"
    >
      <p class="c-notifier__item-text">{{ notification.text }}</p>
      <button
        class="c-notifier__item-close"
        type="button"
        @click="notStore.close(notification.id)"
      >
        close notification
      </button>
    </div>
  </div>
</template>

<script>
import { useNotificationsStore } from '~/stores/notifications.js';

export default {
  name: 'Notifier',
  data() {
    return {
      notStore: useNotificationsStore(),
    };
  },
};
</script>

<style lang="scss">
.c-notifier {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: calc(100% - 2rem);
  max-width: 400px;
  height: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  &__item {
    background-color: darkgray;
    border-radius: 0.5rem;
    padding: 1rem;
    position: relative;
    box-shadow: 0 3px 10px 0 black;

    &--error {
      background-color: red;
      color: white;
    }

    &--message {
      background-color: dodgerblue;
    }

    &-text {
      margin: 0;
    }

    &-close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-family: monospace;
      color: transparent;
      background-color: black;
      border: none;
      border-radius: 0.6rem;
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      padding: 0;
      text-align: center;
      cursor: pointer;

      &:after,
      &:before {
        display: block;
        content: '';
        width: 2px;
        height: 0.8rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: white;
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}
</style>
