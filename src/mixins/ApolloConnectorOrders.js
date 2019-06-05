import gql from 'graphql-tag';
import { OrderFragment } from '@/client/queries';

export default {
    apollo: {
        orders: {
            query: gql`
                query ($dayDate: DateTime!){
                    orders: dayOrders(dayDate: $dayDate) {
                        ... orderData
                    }
                }
                ${OrderFragment}`,
            variables: { dayDate: new Date() }
        }
    },

    computed: {
        dateSortOrders: function () {
            return this.orders.sort((a, b) => a.createdAt - b.createdAt)
        }
    }

}