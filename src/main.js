import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import VueCurrencyInput from 'vue-currency-input'
import { waitOnCache } from "@/client";
Vue.use(VueCurrencyInput);

Vue.config.productionTip = false
const provider = createProvider()

waitOnCache.then(() => {
  new Vue({
    router,
    store,
    apolloProvider: provider,
    render: h => h(App)
  }).$mount('#app')
})
