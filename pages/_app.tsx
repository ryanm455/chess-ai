import { useState, createContext, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "styles/global.css";

let deferredPrompt;
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, setState] = useState({
    installable: false,
    install,
  });

  async function install() {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const accepted = (await deferredPrompt.userChoice).outcome === "accepted";

    if (accepted) {
      deferredPrompt = null;
      setState({ installable: true, ...state });
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        setState({ installable: true, ...state });
      });

      window.addEventListener("appinstalled", () =>
        console.log("INSTALL: Success")
      );
    }
  }, []);

  return (
    <PWAContext.Provider value={state}>
      <ChakraProvider>
        <Head>
          <title>Chess AI</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Navbar />
        <Box pb={71}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ChakraProvider>
    </PWAContext.Provider>
  );
};

export const PWAContext = createContext(null);
export default MyApp;
