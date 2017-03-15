<!-- 
  Template
-->
<template lang="jade">
div.star-rating
  span.star.material-icons(v-for="star in stars", :data-value="star", v-on:mouseover="mouseOver(star)", v-on:mouseout="mouseOut(star)",
                           v-on:click.prevent="setRating(star)", :class="{ 'orange-text': star <= rating && rating != null, 'disabled': disabled }") 
    | {{ getStar(star) }}
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

    &.disabled {
      cursor: default;
    }
  }
}
</style>

<!--
  Script
-->
<script>
export default {
  props: [ 'value', 'disabled' ],
  data() {
    return {
      rating: this.value,
      stars: [ 1, 2, 3, 4, 5 ]
    };
  },
  watch: {
    value() {
      this.rating = this.value;
      this.tempRating = this.value;
    }
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
    },
    setRating(rating) {
      if ( this.disabled === true ) return;

      this.tempRating = rating;
      this.rating = rating;

      this.$emit('input', rating);
    }
  }
}
</script>