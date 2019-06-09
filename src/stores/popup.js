export default {
    state: {
        open: false,
        type: null
    },
    mutations: {
        popupClose(state){
            state.open = false;
            state.type = null;
        },
        popupOpen(state, payload){
            state.open = true;
            state.type = payload.type;
        }
    }
}