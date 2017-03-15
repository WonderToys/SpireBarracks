<template lang="jade">
div.app-layout
  app-menu
  div#main
    router-view
</template>

<style>
.material-tooltip {
  text-align: left;
}
</style>

<script>
import AppMenu from '/imports/ui/AppMenu.vue';

export default {
  components: {
    AppMenu
  }
};
</script>