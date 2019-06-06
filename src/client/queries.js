import gql from 'graphql-tag';
export const OrderFragment = gql`
    fragment orderData on Order {
         open
            id
            table {
                number
            }
            number
            createdAt
            closedAt
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

export const OrderLocalFragment = gql`
    fragment localOrderData on Order {
        totalPrice @client
        updates @client
    }

`