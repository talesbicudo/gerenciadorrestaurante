export default {
    computed: {
        balance() {
            const { totalPay, totalPrice } = this.order;
            return totalPrice - totalPay;
        },
        balanceAbs() {
            return Math.abs(this.balance);
        },
        balanceIsPositive(){
            return this.balance > 0;
        },
        balanceIsZero(){
            return this.balance === 0;
        }
    }
}