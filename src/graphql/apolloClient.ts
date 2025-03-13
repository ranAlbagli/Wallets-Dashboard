import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql", // Ensure this is correct
    credentials: "include", // Required for authentication or cookies
});


const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default apolloClient;
