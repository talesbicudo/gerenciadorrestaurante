import gql from "graphql-tag";
import _ from "lodash";
import {Container, TableItems, OrderFragment} from "@/client/queries";

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
                update(client, {data: {removeItem}}){
                    const data = client.readFragment({fragment: OrderFragment, id: orderId});
                    _.remove(data.consumedItems, item => item.id === removeItem.id);
                    client.writeFragment({data, fragment: OrderFragment, id: orderId});
                },
                refetchQueries: [
                    { query: Container },
                    { query: TableItems, variables: { id: orderId } }
                ]
            })
        }
    }
}