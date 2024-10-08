'use client'
import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const uri = process.env.NEXT_PUBLIC_API_URL + '/graphql';
  console.log(`🔜%capollo.tsx:11 - uri`, 'font-weight:bold; background:#38c700;color:#fff;'); //DELETEME:
  console.log(uri); // DELETEME:
  const apolloClient = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  })

  return <Provider client={apolloClient}>{children}</Provider>
};


