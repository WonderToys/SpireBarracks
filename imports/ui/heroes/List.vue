<template lang="jade">
div.heroes
  div.row
    div(v-for="hero in heroes").col.s4.m2.l1
      div.card
        div.card-image
          img(:src="'img/avatars/' + hero.avatars.base")
          div.shade
          span.card-title {{ hero.name }}
</template>

<style lang="less" scoped>
.card {
  cursor: pointer;

  .card-image {
    .shade {
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background-color: rgba(0, 0, 0, 0.50);
      display: none;
    }

    .card-title {
      font-size: 1.1rem;
      padding: 10px;
      text-shadow: 1px 1px 2px #000000;
      display: none;
    }
  }

  &:hover {
    .card-image {
      .shade, .card-title {
        display: inherit;
      }
    }
  }
}
</style>

<script>
import { Heroes } from '/imports/api/heroes/heroes';

export default {
  meteor: {
    heroes() {
      return Heroes.find({}, {
        sort: {
          elementSort: 1,
          naturalStars: 1,
        }
      });
    }
  }
};
</script>