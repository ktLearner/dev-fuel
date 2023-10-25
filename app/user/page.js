'use client'

import Disp from '@/graphql/disp';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react';


const Page = () => {

    // github graphql api authentication using apollo-client

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


    //   handeling search bar

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };


    return (
        //must be the wraper to use Apolloclient
        <ApolloProvider client={client}>

            <section className='w-full flex-center'>
                <div>
                    <form>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" onChange={handleSearch} id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter github username" required />
                        </div>
                    </form>
                </div>
                <Disp username={searchTerm} />
            </section>
        </ApolloProvider>
    )
}

export default Page