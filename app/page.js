'use client'

import { ApolloClient, createHttpLink, InMemoryCache ,ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Disp from '../graphql/disp';
import  '../public/logo.png';
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
      <section className='w-full flex-center'>
        <div>
        <img src="logo.png" alt="nice" className='h-15 w-20'/>
        {/* <h1>DevFuel</h1> */}
        </div>
      <Disp />
      </section>
    </ApolloProvider>
  )
}

export default Page