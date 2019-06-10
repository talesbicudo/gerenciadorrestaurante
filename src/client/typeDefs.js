import gql from 'graphql-tag';

export default gql`
    scalar DateTime

    type Order {
        consumedItems: [ConsumedItem!]!
        payments: [Payment!]!
        open: Boolean!
        createdAt: DateTime!
        closedAt: DateTime
        table: Table!
        id: String!
        number: Int!
    }

    type Day {
        id: String!
        date: DateTime!
        closedAt: DateTime
        orders: [Order!]!
    }

    type Table {
        id: String!
        number: Int!
    }

    type Payment {
        provider: String
        value: Float!
        createdAt: DateTime!
        id: String!
    }

    type ItemType {
        name: String!
        id: String!
        value: Float!
    }

    type ConsumedItem {
        itemType: ItemType!
        quantity: Int!
        createdAt: DateTime!
        id: String!
    }

    type Query {
       dayOrders(dayDate: DateTime): [Order!]!
       itemTypes: [ItemType!]!
       order(id: String!) : Order!
    }

   type Mutation {
       closeOrder(id: String!) : Order!
       addPayment(id: String!, value: Float! provider: String) : Order!
   }
`