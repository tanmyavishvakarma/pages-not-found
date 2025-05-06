'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/app/api/graphql/apollo-client';

export default function Providers({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 