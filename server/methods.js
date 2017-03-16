import { Meteor } from 'meteor/meteor';

import { HeroRatings } from '/imports/api/ratings/heroRatings';

Meteor.methods({
  getRatingConfig() {
    return JSON.parse(Assets.getText('data/ratingConfig.json'));
  },
  getAggregateRatings({ heroId }) {
    const collection = HeroRatings.rawCollection();
    const aggregate = Meteor.wrapAsync(collection.aggregate, collection);

    return aggregate([ 
      { $match: { heroId } }, 
      { $unwind: '$ratings' },
      {
        $group: {
          _id: '$ratings.key',
          value: { $avg: '$ratings.value' }
        }
      } 
    ]);
  },
  updateAllianceName({ userId, name }) {
    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.allianceName': name
      }
    });
  },
  updateUserRatings({ heroId, userId, obj }) {
    if ( !Array.isArray(obj.ratings) ) {
      const newRatings = Object.keys(obj.ratings).reduce((array, value) => {
        array.push({ key: value, value: obj.ratings[value] });
        return array;
      }, []);
      obj.ratings = newRatings;
    }

    HeroRatings.upsert({ heroId, userId }, obj);
  }
});