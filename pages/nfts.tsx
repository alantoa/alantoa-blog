import { Button } from '@/components/Button'
import MyInfo from '@/components/MyInfo'
import { PageSEO } from '@/components/SEO'
import ETH from '@/components/social-icons/eth.svg'
import Polygon from '@/components/social-icons/polygon.svg'
import siteMetadata from '@/data/siteMetadata'
import { getFileBySlug } from '@/lib/mdx'
import * as Tabs from '@radix-ui/react-tabs'
import axios from 'axios'
import chunk from 'lodash/chunk'
import groupBy from 'lodash/groupBy'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import Sticky from 'react-stickynode'
import { useWindowSize } from 'react-use'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const getTabBarTitle = (chainIdentifier: string) => {
  switch (chainIdentifier) {
    case 'matic':
      return {
        name: 'Polygon',
        icon: <Polygon className="fill-current text-gray-700  dark:text-gray-200" />,
      }
    case 'ethereum':
      return {
        name: 'Ethereum',
        icon: <ETH className="fill-current text-gray-700  dark:text-gray-200 " />,
      }
    case 'all':
      return {
        name: 'All',
        icon: <HiOutlineSquares2X2 size={18} />,
      }
    default:
      return null
  }
}
const NUM_COLUMNS = 3
export async function getServerSideProps() {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { frontMatter } = authorDetails
  const { data } = await axios.get(
    `https://rainbow.me/api/assets?address=${frontMatter.address}&cursor=start`
  )
  const nfts = data?.results.filter((item) => !!item.collection.image_url)
  const groupData = {
    all: nfts,
    ...groupBy(nfts, 'chain_identifier'),
  }

  const tabs = Object.keys(groupData).map((key) => {
    return {
      key,
      nfts: chunk(groupData[key], NUM_COLUMNS),
    }
  })

  try {
    return {
      props: {
        authorDetails,
        nfts,
        tabs,
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}
const size = 204
export default function NFTs({ tabs, authorDetails }) {
  const { frontMatter } = authorDetails
  const [tab, setTab] = useState('all')
  const { width } = useWindowSize()

  // useEffect(() => {
  //   ;(async () => {})()
  // }, [address])

  return (
    <>
      <PageSEO title={`NFTs - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <Sticky enabled={width > 1280}>
          <MyInfo authorDetails={frontMatter} />
        </Sticky>
        <div className="text-md -mx-4 max-w-none pt-8 sm:-mx-6 md:-mx-0 xl:col-span-2">
          <Tabs.Root defaultValue={tab} onValueChange={setTab}>
            <Sticky className="relative z-10">
              <Tabs.List className="-mx-2 mb-2 bg-white px-2 pt-2 dark:bg-gray-900">
                {tabs.map((item) => (
                  <Tabs.Trigger className="mr-2" value={item.key} key={item.key}>
                    <Button className="rounded-md px-2 sm:hover:bg-gray-100 sm:hover:dark:bg-gray-800">
                      <div className="flex flex-row items-center justify-center">
                        {getTabBarTitle(item.key).icon}
                        <span className="ml-1 text-base font-semibold md:text-lg">
                          {getTabBarTitle(item.key).name}
                        </span>
                      </div>
                    </Button>
                    <div
                      className={`mt-1 h-0.5 bg-black duration-200 dark:bg-gray-50 ${
                        item.key === tab ? 'opacity-90' : 'opacity-0'
                      }`}
                    ></div>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Sticky>
            {tabs.map((item) => (
              <Tabs.Content
                className="flex flex-row flex-wrap items-start"
                value={item.key}
                key={item.key}
              >
                {item?.nfts?.map((chuckItem, index) => (
                  <div className="mb-0 flex md:mb-2" key={`${index}`}>
                    {chuckItem?.map((item) => (
                      <Button
                        onClick={() => window.open(item.permalink)}
                        className="md:mr-4"
                        key={item.id}
                      >
                        {item.collection.image_url && (
                          <Image
                            className="h-full w-full object-cover md:h-[204px] md:w-[204px] md:rounded-2xl"
                            src={item.collection.image_url}
                            width={size}
                            height={size}
                            alt={'NFT cover'}
                          />
                        )}
                      </Button>
                    ))}
                  </div>
                ))}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </div>
    </>
  )
}
