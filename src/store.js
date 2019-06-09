import Vue from 'vue'
import Vuex from 'vuex'
import orders from '@/stores/orders'
import mobilePage from '@/stores/mobilePage'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { orders, mobilePage }
})
