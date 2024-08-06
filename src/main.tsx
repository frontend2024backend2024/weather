import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from "react-router-dom";

import {App} from './views/app/app';
import { ThemeProvider } from './provider/ThemeProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <App/>
    </ThemeProvider>
    </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </React.StrictMode>
);