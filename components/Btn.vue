<template>
  <button class="btn"><slot /></button>
</template>

<script>
export default {
  name: 'Btn',
};
</script>

<style lang="scss">
.btn {
  border: $transparent;
  color: $white;
  background-color: $transparent;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 16px;
  position: relative;
  cursor: pointer;
  border-radius: $border-radius;
  white-space: nowrap;
  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: 0.2s;
    border-radius: $border-radius;
  }
  &:hover {
    &::before {
      @include background-btn;
    }
    color: $black;
  }

  &.active {
    color: $black;
  }
}
</style>
