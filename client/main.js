import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

import VueLazyload from '/imports/vendor/vue-lazyload'
import router from '/imports/routes';

import AppLayout from '/imports/ui/AppLayout.vue';

// Load
Meteor.startup(() => {
  Vue.use(VueLazyload, {
    loading: 'img/avatars/empty.png',
    adapter: {
      loaded({ el }, fromCache) {
        $(el).removeAttr('lazy');
      }
    }
  });

  const vm = new Vue({
    router: router.start(),
    render: h => h(AppLayout),
  }).$mount('app');
});