import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Stack } from "expo-router";
import FavContextProvider from "@/context/FavContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavContextProvider>
        <Stack
          screenOptions={{
            headerStyle:{
              backgroundColor:"#1D1616",
            },
            headerTintColor: "white",
            headerShown: false,
            statusBarBackgroundColor: "black",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[mission]" options={{ headerShown: true, title:"Mission Data" }} />
        </Stack>
      </FavContextProvider>
    </QueryClientProvider>
  );
}
