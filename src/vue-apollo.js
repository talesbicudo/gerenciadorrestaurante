import Vue from 'vue'
import VueApollo from 'vue-apollo'
import client from '@/client';
// Install the vue plugin
Vue.use(VueApollo)
export function createProvider() {
  // Create apollo client
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: client
  })

  return apolloProvider
}
