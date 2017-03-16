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
        star-rating(:disabled="user == null", :value="ratings[key]", :show-remove="userRatings == null || userRatings.ratings[key] > 0", 
                    @change="starChanged(key, $event)")

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

import { HeroRatings } from '/imports/api/ratings/heroRatings';

import StarRating from '/imports/ui/components/StarRating.vue';

// Helpers
let ratingKeys = [];

// mapRatings()
const mapRatings = function mapRatings(lookup) {
  return ratingKeys.reduce((obj, item) => {
    const rate = lookup(item);
    if ( rate == null ) {
      obj[item] = 0;
    }
    else {
      obj[item] = rate.value;
    }

    return obj;
  }, {});
}; //- mapRatings()

// Exports
export default {
  components: { StarRating },
  props: [ 'hero' ],
  data() {
    return { 
      userRatings: {},
      ratings: {},
      ratingConfig: {}
    };
  },
  watch: {
    hero() {
      this._updateRatings();
    },
    user() {
      this._updateRatings();
    }
  },
  methods: {
    _updateUserRatings() {
      const dbRatings = HeroRatings.findOne({ heroId: this.hero.uuid, userId: Meteor.userId() }) || {
        heroId: this.hero.uuid,
        userId: Meteor.userId()
      };  

      const ratings = dbRatings.ratings || [];
      dbRatings.ratings = mapRatings(item => ratings.find(r => r.key === item));

      this.userRatings = dbRatings;
    },
    _updateRatings() {
      this.ratings = {};
      if ( this.user == null || this.hero == null ) {
        return;
      }

      Meteor.call('getAggregateRatings', { heroId: this.hero.uuid }, (err, ratings) => {
        this.ratings = mapRatings(item => ratings.find(r => r._id === item));
      });

      this._updateUserRatings();
    },
    starChanged(key, rating) {
      this.userRatings.ratings[key] = rating;

      const args = { heroId: this.hero.uuid, userId: Meteor.userId(), obj: this.userRatings };
      Meteor.call('updateUserRatings', args, (err, res) => {
        this._updateRatings();
      });
    }
  },
  meteor: {
    data: {
      user() {
        return Meteor.user();
      }
    }
  },
  mounted() {
    Meteor.call('getRatingConfig', (err, types) => {
      ratingKeys = Object.keys(types).reduce((initial, key) => {
        return initial.concat(Object.keys(types[key]));
      }, []);

      this.ratingConfig = types;
      this._updateRatings();
    });
  }
};
</script>