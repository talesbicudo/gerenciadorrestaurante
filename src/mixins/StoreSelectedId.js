export default {
    computed: {
        storeSelectedId() {
            return this.$store.state.orders.selectedId;
        },
        hasSelectedId(){
            return !!this.storeSelectedId
        }
    }
}