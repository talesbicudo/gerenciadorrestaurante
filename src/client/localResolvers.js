import UPDATE from '@/types/update';

export default {
    Order: {
        updates: function (order) {
           return [
                { date: order.createdAt, type: UPDATE.CREATION },
                ...order.consumedItems.map(consumedItem => ({ date: consumedItem.createdAt, type: UPDATE.ITEM_ADD })),
                ...order.payments.map(payment => ({ date: payment.createdAt, type: UPDATE.PAYMENT_ADD }))
            ].sort((updateA, updateB) => updateA.date - updateB.date)
        },
        totalPrice: function (order) {
            return order.consumedItems.reduce((total, consumed) =>
                total + consumed.quantity + consumed.itemType.value
                , 0)
        }
    }
}