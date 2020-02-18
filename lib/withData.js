import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { endpoint } from "../config";

function createClient({ headers, initialState }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
