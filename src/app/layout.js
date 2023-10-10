// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
'use client'
import { store } from '@/store/store';
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
import { Provider } from 'react-redux';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <ChakraProvider>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Stack width={'100%'} align='center' padding={'48px'}>
                  <Stack maxWidth={'1200px'} width='100%'>
                    {children}
                  </Stack>

                </Stack>
              </QueryClientProvider>
            </Provider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
export default RootLayout