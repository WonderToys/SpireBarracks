<template lang="jade">
div.star-bar
  img(:src="'img/' + starImage() + '.png'", :class="starClass(1)")
  img(:src="'img/' + starImage() + '.png'", v-if="hero.naturalStars >= 2", :class="starClass(2)")
  img(:src="'img/' + starImage() + '.png'", v-if="hero.naturalStars >= 3", :class="starClass(3)")
  img(:src="'img/' + starImage() + '.png'", v-if="hero.naturalStars >= 4", :class="starClass(4)")
  img(:src="'img/' + starImage() + '.png'", v-if="hero.naturalStars >= 5", :class="starClass(5)")
  img(:src="'img/' + starImage() + '.png'", v-if="hero.naturalStars >= 6", :class="starClass(6)")
</template>

<style lang="less" scoped>
.star-bar {
  text-align: center;

  img {
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-right: -4px;

    &.small {
      width: 14px;
      z-index: 1;
    }

    &.medium {
      width: 16px;
      z-index: 2;
    }

    &.large {
      width: 18px;
      z-index: 3;
    }
  }
}
</style>

<script>
export default {
  props: [ 'hero', 'ascended' ],
  methods: {
    starImage() {
      if ( this.hero.canAscend !== true ) {
        return 'star_food';
      }

      if ( this.ascended === true ) {
        return 'star_ascended';
      }

      return 'star'
    },
    starClass(starPlace) {
      switch ( this.hero.naturalStars ) {
        case 5: {
          if ( starPlace == 1 || starPlace == 5 ) {
            return { 'small': true };
          }

          if ( starPlace == 2 || starPlace == 4 ) {
            return { 'medium': true };
          }

          return { 'large': true };
        }
        case 4: {
          if ( starPlace == 1 || starPlace == 4 ) {
            return { 'medium': true };
          }
          
          return { 'large': true };
        }
        case 3: {
          if ( starPlace == 1 || starPlace == 3 ) {
            return { 'medium': true };
          }
          
          return { 'large': true };
        }
        default: {
          return { 'large': true };
        }
      }
    }
  }
}
</script>