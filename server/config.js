import { Meteor } from 'meteor/meteor';

// Service Configurations
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

ServiceConfiguration.configurations.upsert({
    service: "facebook"
  }, {
    $set: {
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret,
      loginStyle: "popup"
    }
  }
);

// Account Setup
Accounts.onCreateUser((options, user) => {
  user.allianceName = "";
  return user;
});