import Vue from 'vue'
import Vuex from 'vuex'
import orders from '@/stores/orders'
import mobilePage from '@/stores/mobilePage'
import popup from '@/stores/popup';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { orders, mobilePage, popup }
})
