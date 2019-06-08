import MOBILE_PAGE from '@/types/MobilePage'
export default {
    state: {
        type: MOBILE_PAGE.ORDER_SELECT
    },
    mutations: {
        mobilePageChange(state, payload){
            state.type = payload.type;
        }
    }
}