import '@/css/prism.css'
import '@/css/tailwind.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import { ClientReload } from '@/components/ClientReload'
import LayoutWrapper from '@/components/LayoutWrapper'
import siteMetadata from '@/data/siteMetadata'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: 'Alan Website',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps, router }: AppProps) {
  const disableLayout = [`/`].includes(router.pathname)
  const LayoutComponent = disableLayout ? React.Fragment : LayoutWrapper

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          {isDevelopment && isSocket && <ClientReload />}
          <Analytics />
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
