import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
  const [isOnline, setOnline] = useState(true);

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    console.log(isOnline);
    return () => {
      window.removeEventListener("load", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet({
              recommended: true,
            }),
            walletConnect(),
          ]}
          activeChain={11155111}
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        >
          {isOnline ? (
            <Component {...pageProps} />
          ) : (
            <div className="flex flex-col justify-center items-center mt-[20vh]">
              <MdSignalWifiStatusbarConnectedNoInternet className="text-9xl " />
              <span className="text-2xl">No internet connection.
              </span>
            </div>
          )}
        </ThirdwebProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
