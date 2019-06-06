import UPDATE from '@/types/update';
import SEARCH_TAG from '@/types/SearchTag';
import _ from 'lodash';

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
        searchTags: function(order){
            return {
                [SEARCH_TAG.ITEMS]: _.map(order.consumedItems, 'itemType.name'),
                [SEARCH_TAG.PROVIDERS]: _.map(order.payments, 'provider'),
                [SEARCH_TAG.TABLE_NUMBER]: [order.table.number],
            }
        }
    }
}