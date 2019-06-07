import UPDATE from '@/types/update';
import SEARCH_TAG from '@/types/SearchTag';

export default {
    Order: {
        updates: function (order) {
            return [
                { date: order.createdAt, type: UPDATE.CREATION },
                ...order.consumedItems.map(consumedItem => ({ date: consumedItem.createdAt, type: UPDATE.ITEM_ADD })),
                ...order.payments.map(payment => ({ date: payment.createdAt, type: UPDATE.PAYMENT_ADD })),
                !order.open ? null : { date: order.closedAt, type: UPDATE.FINISH }
            ].filter(up => up).sort((updateA, updateB) => updateA.date - updateB.date)
        },
        totalPrice: function (order) {
            return order.consumedItems.reduce((total, consumed) =>
                total + consumed.quantity * consumed.itemType.value
                , 0)
        },
        searchTags: function (order) {
            const toLowerCase = v => String(v).toLowerCase();
            return [
                ...order.consumedItems.map(item => ({
                    value:
                        toLowerCase(item.itemType.name),
                    type: SEARCH_TAG.ITEM
                })),
                ...order.payments.map(payment => ({
                    value: toLowerCase(payment.provider),
                    type: SEARCH_TAG.PROVIDER
                }))
            ]
        }
    }
}