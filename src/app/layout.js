// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
'use client'
import '../../styles/main.css'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Stack } from '@chakra-ui/react'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

import { ReactQueryDevtools } from 'react-query/devtools';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <ChakraProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Stack width={'100%'} align='center' padding={'48px'}>
                <Stack maxWidth={'400px'} width='100%'>
                  {children}
                </Stack>

              </Stack>
            </QueryClientProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
