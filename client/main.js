import {Meteor} from 'meteor/meteor';
import Vue from 'vue';

import router from '/imports/routes';

import AppLayout from '/imports/ui/AppLayout.vue';

// Load
Meteor.startup(() => {
  new Vue({
    router: router.start(),
    render: h => h(AppLayout),
  }).$mount('app');
});