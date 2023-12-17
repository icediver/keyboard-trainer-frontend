"use client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { PropsWithChildren } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./auth-provider/AuthProvider";

import { persistor, store } from "@/store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>{children} </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
