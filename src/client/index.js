import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import localResolvers from './localResolvers';
import { persistCache } from 'apollo-cache-persist';

import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools';


const schema = makeExecutableSchema({ typeDefs })

addMockFunctionsToSchema({
    schema,
    mocks: resolvers,
    preserveResolvers: true
})

const cache = new InMemoryCache({ dataIdFromObject: object => object.id })

export const waitOnCache = persistCache({
    cache,
    storage: window.localStorage,
});



export default new ApolloClient({
    cache,
    link: new SchemaLink({ schema }),
    resolvers: localResolvers
})

