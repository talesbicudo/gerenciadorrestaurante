import gql from 'graphql-tag';
export default {
    apollo: {
        info: {
            query: gql`
                query info ($id: String!){
                    updates(id: $id) @client
                    totalPrice(id: $id) @client
                }`,
            variables() {
                return { id: this.id }
            },
            update: data => data,
            result: function ({ data, }) {
                this.info = data;
            }
        }
    }
}