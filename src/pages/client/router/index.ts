import Vue from "vue";
import Router from "vue-router";

import constPublicRoutes, {afterHandler} from "./config";
import {beforeEachHandler} from "./config";

Vue.use(Router);

function getMode() {
  if (typeof window.history.pushState === 'function'){
    return "history";
  } else {
    return "hash";
  }
}

const router = new Router({
  // mode: getMode(),
  routes: constPublicRoutes
});

router.beforeEach(beforeEachHandler);
router.afterEach(afterHandler);

export default router;
