'use client'

// import { ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql,createHttpLink } from "@apollo/client"

import { ApolloClient, createHttpLink, InMemoryCache ,ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Disp from './graphql/disp';
// import {setContext} from 'react';

const Page = () => {

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });
  

  const authLink = setContext((_, { headers }) => {
    
    const token = "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";
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>
      <section >
      <h1>nuts</h1>
      <Disp />
      </section>
    </ApolloProvider>
  )
}

export default Page