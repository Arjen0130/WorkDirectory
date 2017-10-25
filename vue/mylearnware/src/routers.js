import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index    from '@/pages/Index'


export default new Router({
  mode:"history",
  routes: [
    { path: '/',            name: 'Index',          component: Index        }
  ]

})
