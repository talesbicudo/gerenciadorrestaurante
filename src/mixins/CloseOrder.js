import gql from "graphql-tag";
import {OrderFragment, Container} from '@/client/queries';
import StoreSelectedId from "@/mixins/StoreSelectedId";
export default {
  mixins: [StoreSelectedId],
  methods: {
    closeOrder() {
      const id = this.storeSelectedId;
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: String!) {
            closeOrder(id: $id) {
              open
              closedAt
            }
          }
        `,
        variables: { id },
        update(client, {data: {closeOrder}}){
            const data = client.readFragment({id, fragment: OrderFragment })
            data.open = closeOrder.open;
            data.closedAt = closeOrder.closedAt;
            client.writeFragment({id, fragment: OrderFragment, data});
        },
        refetchQueries: [{query: Container}]
      });
    }
  }
};