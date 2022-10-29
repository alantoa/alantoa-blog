import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import {
  ConnectButton,
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import { ReactNode } from 'react'
import { useDisconnect } from 'wagmi'
import Footer from './Footer'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  const { disconnect } = useDisconnect()

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between text-black dark:text-white">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 150 150"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M62.007 36.7175L66.9359 42.9395L38.5136 102.049L33.1937 101.638L62.007 36.7175Z" />
                  <path d="M62.0295 36.7112L68.3533 40.5824L79.4437 85.3876L73.1937 87.8876L62.0295 36.7112Z" />
                  <path d="M123.243 68.6312L116.342 75.6207L29.4439 109.138L33.1938 101.638L123.243 68.6312Z" />
                  <path d="M76.9436 106.638L82.5686 104.138L84.4436 109.138H76.9436V106.638Z" />
                  <path d="M96.1034 82.8775L99.4437 80.3877L107.457 108.968L102.931 109.081L96.1034 82.8775Z" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <ConnectButton.Custom>
              {({ openConnectModal, account }) => {
                return (
                  !account && (
                    <button
                      onClick={() => {
                        openConnectModal()
                      }}
                      className="ml-1"
                    >
                      Sign in
                    </button>
                  )
                )
              }}
            </ConnectButton.Custom>
            <ConnectButton.Custom>
              {({ account }) => {
                return (
                  account && (
                    <button
                      onClick={() => {
                        openAccountModal()
                      }}
                      className="ml-1"
                    >
                      Sign out
                    </button>
                  )
                )
              }}
            </ConnectButton.Custom>
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto w-full">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
