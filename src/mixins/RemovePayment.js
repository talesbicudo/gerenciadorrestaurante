import gql from "graphql-tag";
import {Container, TablePayments} from "@/client/queries";

export default {
    methods: {
        removePayment(orderId, paymentId) {
            return this.$apollo.mutate({
                mutation: gql`
                    mutation($orderId: String! $paymentId: String!) {
                        removePayment(orderId: $orderId paymentId: $paymentId){
                            id
                        }
                    }
                `,
                variables: { orderId, paymentId },
                refetchQueries: [
                    { query: Container },
                    { query: TablePayments, variables: { id: orderId } }
                ]
            })
        }
    }
}