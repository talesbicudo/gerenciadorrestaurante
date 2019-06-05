import gql from 'graphql-tag';
export const OrderFragment = gql`
    fragment orderData on Order {
         open
            id
            table {
                number
            }
            createdAt
            consumedItems {
                itemType {
                    name
                    value
                    id
                }
                createdAt
                id
                quantity
            }
            payments {
                id
                provider
                createdAt
                value
            }
    }
`