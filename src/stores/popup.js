export default {
    state: {
        type: null,
        args: null
    },
    mutations: {
        popupClose(state){
            state.type = null;
            state.args = null;
        },
        popupOpen(state, payload){
            state.type = payload.type;
            state.args = payload.args
        }
    }
}