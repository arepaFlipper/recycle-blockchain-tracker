import { InMemoryCache, ApolloClient, ApolloProvider as Provider } from "@apollo/client";
import { ReactNode } from "react";

export interface IApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const uri = `http://192.168.1.76:3001/graphql`;
  const apolloClient = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>
}
