import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Image from "next/image";

import "@polkadot/api-augment";
import { Providers } from "./providers";
import { inter, notoSansMono, pt_mono } from "./fonts";
import Link from "next/link";
import { DiscordIcon, GithubIcon, XIcon } from "./ui/icons";
import Script from "next/script";
import { Youtube } from "lucide-react";
import { ConnectButton } from "./ui/connect-button";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Kusamarian Staking and Delegating App",
  description: "Stake your DOT and KSM with The Kusamarian",
  metadataBase: new URL("https://thekus.xyz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansMono.className}`}>
        <Providers>
          <div className="relative flex flex-col min-h-[100vh]">
            <header className="h-24">
              <nav className="flex fixed w-full top-0 h-24 p-4 justify-between">
                <Image
                  src="kusamarian.png"
                  alt="Kusamarian Logo"
                  width={75}
                  height={80}
                />
                <ConnectButton />
              </nav>
            </header>
            <main className="flex max-w-7xl mx-auto p-4 flex-grow w-full">
              {children}
            </main>
            <footer className="fixed bottom-0 flex max-w-7xl mx-auto h-16 p-4 w-full text-xs items-center gap-2">
              <Link
                href="https://github.com/TheKusamarian/stake-n-vote"
                target="_blank"
              >
                {" "}
                <GithubIcon size={28} />
              </Link>

              <Link
                href="https://discord.gg/CRNDnguJXx
                "
                target="_blank"
                className="pl-2"
              >
                <DiscordIcon size={32} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCqNw3CEyOD-bjjYYaxVyG3Q
                "
                target="_blank"
                className="pl-2"
              >
                <Youtube size={32} />
              </Link>
              <Link
                href="https://twitter.com/TheKusamarian
                "
                target="_blank"
                className="pl-2"
              >
                <XIcon size={22} />
              </Link>
            </footer>
          </div>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 4000,
                iconTheme: {
                  primary: "green",
                  secondary: "white",
                },
              },
            }}
          />
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7RG8GF0LMC" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-7RG8GF0LMC');
        `}
        </Script>
      </body>
    </html>
  );
}
