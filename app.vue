<template>
  <NuxtLayout name="default" class="default">
    <NuxtPage />
    <Notifier />
  </NuxtLayout>
</template>

<script>
import Notifier from '~/components/Notifier.vue';
export default {
  components: { Notifier },
};
</script>
<style lang="scss">
.default {
  width: 100vw;
  height: 100%;
}
</style>
