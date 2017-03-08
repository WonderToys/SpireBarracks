import { Meteor } from 'meteor/meteor';

import { migrateData } from '/imports/api/migrateData';

Meteor.startup(() => {
  migrateData();
});
