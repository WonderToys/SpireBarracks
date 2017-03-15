import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updateAllianceName({ userId, name }) {
    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.allianceName': name
      }
    });
  },
  getRatingConfig() {
    return JSON.parse(Assets.getText('data/ratingConfig.json'));
  }
});