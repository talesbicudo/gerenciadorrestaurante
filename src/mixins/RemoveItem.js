import gql from "graphql-tag";
import {Container, TableItems} from "@/client/queries";

export default {
    methods: {
        removeItem(orderId, itemId) {
            return this.$apollo.mutate({
                mutation: gql`
                    mutation($orderId: String! $itemId: String!) {
                        removeItem(orderId: $orderId itemId: $itemId){
                            id
                        }
                    }
                `,
                variables: { orderId, itemId },
                refetchQueries: [
                    { query: Container },
                    { query: TableItems, variables: { id: orderId } }
                ]
            })
        }
    }
}