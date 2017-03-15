<!-- 
  Template
-->
<template lang="jade">
div.col.s10
  div.row
    div.col.s4(v-for="(items, cat) in ratingConfig")
      h5 {{ cat }}
      div.valign-wrapper.rating-container(v-for="(title, key) in items")
        span.label.valign {{ title }}
        star-rating(:disabled="user == null", v-model="hero.ratings[key]")

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
import { Meteor } from 'meteor/meteor';
import { Heroes } from '/imports/api/heroes/heroes';

import StarRating from '/imports/ui/components/StarRating.vue';

export default {
  components: { StarRating },
  props: [ 'hero' ],
  data() {
    return { 
      ratingConfig: {}
    };
  },
  meteor: {
    data: {
      user() {
        return Meteor.user();
      }
    }
  },
  created() {
    Meteor.call('getRatingConfig', (err, types) => {
      this.ratingConfig = types;
    });
  }
};
</script>