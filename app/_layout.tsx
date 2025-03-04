import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: "black",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{headerShown:false}}
        />
      </Stack>
    </QueryClientProvider>
  );
}
