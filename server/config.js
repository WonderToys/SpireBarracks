import { Meteor } from 'meteor/meteor';

// ServiceConfiguration
ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: Meteor.settings.google.clientId,
      secret: Meteor.settings.google.clientSecret,
      loginStyle: "popup"
    }
  }
);

// Account Setup
Accounts.onCreateUser((options, user) => {
  user.allianceName = "";
  return user;
});