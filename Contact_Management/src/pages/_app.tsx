// App.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../Context/AuthContext"; // Adjust the import path as needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
