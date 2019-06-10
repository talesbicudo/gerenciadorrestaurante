export default {
    state: {
        type: null
    },
    mutations: {
        popupClose(state){
            state.type = null;
        },
        popupOpen(state, payload){
            state.type = payload.type;
        }
    }
}