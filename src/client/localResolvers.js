import { OrderFragment } from '@/client/queries';
import UPDATE from '@/types/update';

export default {
    Query: {
        updates: function (_, { id }, { cache }) {
            const order = cache.readFragment({
                id,
                fragment: OrderFragment
            })
            return [
                {date: order.createdAt, type: UPDATE.CREATION },
                ...order.consumedItems.map(consumedItem => ({date: consumedItem.createdAt, type: UPDATE.ITEM_ADD})),
                ...order.payments.map(payment => ({date: payment.createdAt, type: UPDATE.PAYMENT_ADD}))
            ].sort((updateA, updateB) => updateA.date - updateB.date) 
        }
    }
}