console.log("Step:5.000--step into store.js file.");

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

/*
每一个 Vuex 应用的核心就是 store（仓库）。
“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
1. Vuex 的状态存储是响应式的。
    当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。
    改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。
    这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
 */
export default new Vuex.Store({
  state,  //定义在state.js中的state对象，包含一个todoItems属性
  mutations,  //定义在mutations.js中的类似于事件的mutation，只能完成同步操作
  getters,  //定义在getters.js中的用来获取state中存储的todoItems的getter属性
  actions  //定义在actions.js中的action，完成一系列的异步操作
})
