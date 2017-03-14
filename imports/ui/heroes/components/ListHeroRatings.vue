<!-- 
  Template
-->
<template lang="jade">
div.col.s10
  div.row
    div.col.s4
      h5 Content
      div.valign-wrapper.rating-container
        span.label.valign Early Game
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Scenarios
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Temples
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Arena
        star-rating
    div.col.s4
      h5 Dungeons
      div.valign-wrapper.rating-container
        span.label.valign Ironclaw
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Swiftsteel
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Lifesilk
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Wartech
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Witchstone
        star-rating
      div.valign-wrapper.rating-container
        span.label.valign Titanguard
        star-rating
    div.col.s4
      h5 Equipment
      div.valign-wrapper.rating-container
        span.label.valign Coming Soon!
</template>

<!--
  Styles
-->
<style lang="less" scoped>
h5 {
  margin-top: 0;
}

.rating-container {
  margin-bottom: 0.5rem;

  .label {
    width: 40%;
  }
}
</style>

<!--
  Script
-->
<script>
import StarRating from '/imports/ui/components/StarRating.vue';

export default {
  components: { StarRating }
};
</script>