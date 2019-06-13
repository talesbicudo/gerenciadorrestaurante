import gql from "graphql-tag";
import { OrderFragment, TablePayments, Container } from "@/client/queries";

export default {
    methods: {
        addPayment(id, value, provider) {
            return this.$apollo
                .mutate({
                    mutation: gql`
            mutation($id: String!, $value: Float!, $client: String) {
              addPayment(value: $value, id: $id, provider: $client) {
                id
                provider
                value
                createdAt
              }
            }
          `,
                    variables: {
                        id,
                        value,
                        client: provider
                    },
                    update(client, { data: { addPayment } }) {
                        const data = client.readFragment({ id, fragment: OrderFragment });
                        data.payments.push(addPayment);
                        client.writeFragment({
                            id,
                            fragment: OrderFragment,
                            data
                        });
                    },
                    refetchQueries: [
                        { query: Container },
                        { query: TablePayments, variables: { id } }
                    ]
                })
        }
    }
}