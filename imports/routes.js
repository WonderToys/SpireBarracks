import {Router, nativeScrollBehavior} from 'meteor/akryum:vue-router2';

// Create router
const router = new Router({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior,
  linkActiveClass: 'active',
});

Router.configure(router => {
  router.addRoute({
    path: '*',
    redirect: '/heroes'
  });
}, -1);

export default router;