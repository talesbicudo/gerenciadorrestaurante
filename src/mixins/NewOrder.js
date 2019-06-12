import gql from "graphql-tag";
import { OrderFragment, LoadingOrders, Container } from "@/client/queries";

export default {
    methods: {
        newOrder(tableNumber) {
            return this.$apollo.mutate({
                mutation: gql`
                    mutation ($tableNumber: Int!){
                        newOrder(tableNumber: $tableNumber){
                            ... orderData
                        }
                    } 
                    ${OrderFragment}
                `,
                variables: { tableNumber },
                refetchQueries: [{query: LoadingOrders}, {query: Container}]
            },
            )
        }
    }
}