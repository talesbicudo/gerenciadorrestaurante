import UPDATE from '@/types/update';
import SEARCH_TAG from '@/types/SearchTag';
import { OrderFragment } from './queries'
export default {
    Query: {
        order(_, { id }, { cache }) {
            return cache.readFragment({
                id,
                fragment: OrderFragment
            })
        }
    },
    ConsumedItem: {
        totalPrice(consumedItem){
            return consumedItem.quantity * consumedItem.itemType.value;
        }
    },
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
        totalPay: function(order){
            return order.payments.reduce((total, {value}) => total + value, 0)
        },
        searchTags: function (order) {
            return [
                ...order.consumedItems.map(item => ({
                    value: item.itemType.name,
                    type: SEARCH_TAG.ITEM
                })),
                ...order.payments.map(payment => ({
                    value: payment.provider,
                    type: SEARCH_TAG.PROVIDER
                }))
            ]
        }
    }
}