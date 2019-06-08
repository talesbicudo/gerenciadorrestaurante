export default {
    state: {
        selectedId: null
    },
    mutations: {
        orderSelect(state, payload){
           state.selectedId = payload.selectedId; 
        },
        orderUnSelect(state){
            state.selectedId = null;
        }
    }
}