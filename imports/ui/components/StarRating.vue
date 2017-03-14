<!-- 
  Template
-->
<template lang="jade">
div.star-rating
  span.star.material-icons(v-for="star in stars", :data-value="star", :class="{ 'orange-text': star <= rating && rating != null }",
                           v-on:mouseover="mouseOver(star)", v-on:mouseout="mouseOut(star)") {{ getStar(star) }}
</template>

<!--
  Style
-->
<style lang="less" scoped>
.star-rating {
  display: inherit;

  .star {
    cursor: pointer;
    color: #636363;
    font-size: 1.5rem;
  }
}
</style>

<!--
  Script
-->
<script>
export default {
  data() {
    return {
      rating: 0,
      stars: [ 1, 2, 3, 4, 5 ],
      disabled: false
    };
  },
  methods: {
    getStar(star) {
      if ( this.rating < star ) {
        return 'star_border';
      }

      return 'star';
    },
    mouseOver(star) {
      if ( this.disabled === true ) return;

      this.tempRating = this.rating;
      this.rating = star;
    },
    mouseOut(star) {
      if ( this.disabled === true ) return;

      this.rating = this.tempRating;
    }
  }
}
</script>