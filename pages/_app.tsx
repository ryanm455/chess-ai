import { useState, createContext, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, setState] = useState({
    pwaInstalled: false,
    installPWA: undefined,
  });

  const installPWA = async () => {
    // @ts-ignore
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) return;

    promptEvent.prompt();
    const accepted = (await promptEvent.userChoice).outcome === "accepted";

    if (accepted) {
      // @ts-ignore
      window.deferredPrompt = null;
      setState({ pwaInstalled: true, ...state });
    }
  };

  const pwa = async () => {
    // @ts-ignore
    window.addEventListener("beforeinstallprompt", (e) => (window.deferredPrompt = e));

    if ("getInstalledRelatedApps" in window.navigator) {
      // @ts-ignore
      const relatedApps = await navigator.getInstalledRelatedApps();

      if (!relatedApps.length) {
        setState({ pwaInstalled: false, installPWA });
      } else {
        setState({ pwaInstalled: true, installPWA });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      pwa();
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
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </PWAContext.Provider>
  );
};

export const PWAContext = createContext(null);
export default MyApp;
