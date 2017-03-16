<!-- 
  Template
-->
<template lang="jade">
div.star-rating
  transition(name="fade")
    div(v-if="ratingSet !== true")
      span.star.material-icons(v-for="star in stars", :data-value="star", v-on:mouseover="mouseOver(star)", v-on:mouseout="mouseOut(star)",
                               v-on:click.prevent="setRating(star)", :class="getStarClasses(star)") 
        | {{ getStar(star) }}
      i.material-icons.right(v-if="showRemove", data-delay="500", data-position="top", data-tooltip="Remove rating",
                             v-on:click="setRating(0)") remove_circle_outline

  transition(name="fade")
    div(v-if="ratingSet === true")
      div Saved!
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

      &.hover {
        text-shadow: none;
      }
    }

    &.hover {
      color: #9575cd !important;
    }
  }

  i.right {
    margin-left: 5px;
    font-size: 1.4rem;
    cursor: pointer;
  }

  > div {
    display: inherit;

    > div {
      color: #212121;
      text-align: center;
      margin-left: 2.25rem;
    }
  }
}

.fade-enter-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
</style>

<!--
  Script
-->
<script>
export default {
  props: [ 'value', 'disabled', 'show-remove' ],
  data() {
    return {
      rating: this.value,
      ratingSet: false,
      stars: [ 1, 2, 3, 4, 5 ]
    };
  },
  watch: {
    value() {
      this.rating = this.value;
      this.tempRating = this.value;

      this.$forceUpdate();
    }
  },
  methods: {
    getStarClasses(star) {
      const isRated = star <= this.rating && this.rating != null;
      const isHovered = this.isHovered === true;

      return { 
        'orange-text': isRated,
        'hover': isRated && isHovered && this.disabled !== true,
        'disabled': this.disabled 
      };
    },
    getStar(star) {
      if ( this.rating < star || this.rating == null ) {
        return 'star_border';
      }

      return 'star';
    },
    mouseOver(star) {
      if ( this.disabled === true ) return;

      this.tempRating = this.rating;
      this.rating = star;
      this.isHovered = true;

      this.$forceUpdate();
    },
    mouseOut(star) {
      if ( this.disabled === true ) return;

      this.rating = this.tempRating;
      this.isHovered = false;

      this.$forceUpdate();
    },
    setRating(rating) {
      if ( this.disabled === true ) return;

      this.tempRating = rating;
      this.rating = rating;
      this.isHovered = false;

      this.ratingSet = true;
      setTimeout(() => {
        this.ratingSet = false;
      }, 1000);

      this.$emit('change', rating);
    }
  },
  mounted() {
    $('[data-tooltip]').tooltip();
  },
  updated() {
    $('[data-tooltip]').tooltip();
  }
}
</script>