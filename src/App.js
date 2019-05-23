import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import Cliente from "./components/cliente";
import React from "react";

const client = new ApolloClient({
  uri: "http://localhost:3000"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Cliente />
    </ApolloProvider>
  );
}
