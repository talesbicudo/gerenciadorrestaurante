import gql from "graphql-tag";
import { Container, TablePayments, OrderFragment } from "@/client/queries";
import _ from "lodash";

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
                update(client, { data: { removePayment } }) {
                    const data = client.readFragment({ fragment: OrderFragment, id: orderId });
                    _.remove(data.payments, payment => payment.id === removePayment.id);
                    client.writeFragment({ data, fragment: OrderFragment, id: orderId });
                },
                variables: { orderId, paymentId },
                refetchQueries: [
                    { query: Container },
                    { query: TablePayments, variables: { id: orderId } }
                ]
            })
        }
    }
}