/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Button'
import MyInfo from '@/components/MyInfo'
import { PageSEO } from '@/components/SEO'
import ETH from '@/components/social-icons/eth.svg'
import Polygon from '@/components/social-icons/polygon.svg'
import siteMetadata from '@/data/siteMetadata'
import { getFileBySlug } from '@/lib/mdx'
import axios from 'axios'
import { Masonry } from 'masonic'
import Image from 'next/image'
import 'photoswipe/dist/photoswipe.css'
import { useCallback, useEffect, useState } from 'react'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { Gallery, GalleryProps, Item } from 'react-photoswipe-gallery'
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
  // const groupData = {
  //   all: nfts,
  //   ...groupBy(nfts, 'chain_identifier'),
  // }

  // const tabs = Object.keys(groupData).map((key) => {
  //   return {
  //     key,
  //     nfts: groupData[key],
  //   }
  // })

  try {
    return {
      props: {
        authorDetails,
        nfts,
        // tabs,
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}
const size = 204
const Card = ({ data: item }) => {
  const [layout, setLayout] = useState({
    width: 400,
    height: 400,
  })

  const onLoadingComplete = useCallback((e: HTMLImageElement) => {
    setLayout({
      width: e.naturalWidth,
      height: e.naturalHeight,
    })
  }, [])
  console.log(item, item.collection.name)

  return (
    <Item
      original={
        item.metadata.image_url ?? item.metadata.image_thumbnail_url ?? item.collection.image_url
      }
      thumbnail={item.metadata.image_thumbnail_url ?? item.collection.image_url}
      key={item.id}
      {...layout}
    >
      {({ ref, open }) => (
        <div className="cursor-pointer rounded-lg p-2 shadow shadow-slate-100 dark:bg-gray-800 dark:shadow-none md:p-3">
          <Image
            onClick={open}
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            className="w-full rounded-md object-cover"
            src={item.metadata.image_url ?? item.collection.image_url}
            alt={'NFT cover'}
            width={400}
            height={400}
            onLoadingComplete={onLoadingComplete}
          />
          <Button
            onClick={() => window.open(item.permalink)}
            className="mt-2 text-lg font-semibold text-gray-700 line-clamp-2 dark:text-gray-100"
          >
            {item.collection.name}
          </Button>
        </div>
      )}
    </Item>
  )
}
const uiElements: GalleryProps['uiElements'] = [
  {
    name: 'bulletsIndicator',
    order: 9,
    isButton: false,
    appendTo: 'wrapper',
    onInit: (el, pswpInstance) => {
      let prevIndex = -1
      const thumbnails: HTMLElement[] = []

      el.style.position = 'absolute'
      el.style.bottom = '20px'
      el.style.left = '10px'
      el.style.right = '0'
      el.style.display = 'grid'
      el.style.gridGap = '10px'
      el.style.gridTemplateColumns = 'repeat(auto-fit, 40px)'
      el.style.gridTemplateRows = 'repeat(auto-fit, 40px)'
      el.style.justifyContent = 'center'

      const dataSource = pswpInstance.options.dataSource as any

      for (let i = 0; i < dataSource.length; i++) {
        const slideData = dataSource[i]

        const thumbnail = document.createElement('div')
        thumbnail.style.transition = 'transform 0.15s ease-in'
        thumbnail.style.opacity = '0.6'
        thumbnail.style.cursor = 'pointer'
        thumbnail.onclick = (e: MouseEvent) => {
          const target = e.target as HTMLImageElement | HTMLDivElement
          const thumbnailEl =
            target.tagName === 'IMG'
              ? target.parentElement
              : (e.target as HTMLImageElement | HTMLDivElement)
          if (thumbnailEl) {
            pswpInstance.goTo(thumbnails.indexOf(thumbnailEl))
          }
        }

        const thumbnailImage = document.createElement('img')
        thumbnailImage.setAttribute('src', slideData.msrc || '')
        thumbnailImage.style.width = '100%'
        thumbnailImage.style.height = '100%'
        thumbnailImage.style.objectFit = 'cover'

        thumbnail.appendChild(thumbnailImage)

        el.appendChild(thumbnail)

        thumbnails.push(thumbnail)
      }

      pswpInstance.on('change', () => {
        if (prevIndex >= 0) {
          const prevThumbnail = thumbnails[prevIndex]
          prevThumbnail.style.opacity = '0.6'
          prevThumbnail.style.cursor = 'pointer'
          prevThumbnail.style.transform = 'scale(1)'
        }

        const currentThumbnail = thumbnails[pswpInstance.currIndex]
        currentThumbnail.style.opacity = '1'
        currentThumbnail.style.cursor = 'unset'
        currentThumbnail.style.transform = 'scale(1.2)'

        prevIndex = pswpInstance.currIndex
      })
    },
  },
]
const List = ({ list }) => {
  return (
    <Gallery
      options={{
        arrowNext: false,
        arrowPrev: false,
      }}
      // uiElements={uiElements}
    >
      <Masonry
        // Provides the data for our grid items
        items={list}
        // Adds 8px of space between the grid cells
        columnGutter={8}
        // Sets the minimum column width to 172px
        columnWidth={172}
        // Pre-renders 5 windows worth of content
        overscanBy={NUM_COLUMNS}
        // This is the grid item component
        render={Card}
        id="gallery"
      />
    </Gallery>
  )
}
export default function NFTs({ nfts, authorDetails }) {
  const { frontMatter } = authorDetails
  const { width } = useWindowSize()

  const [showComponent, setShowComponent] = useState(false)
  useEffect(() => {
    setShowComponent(true)
  }, [])
  return (
    <>
      <PageSEO title={`NFTs - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <Sticky enabled={width > 1280}>
          <MyInfo authorDetails={frontMatter} />
        </Sticky>
        <div className="text-md -mx-4 max-w-none pt-8 sm:-mx-6 md:-mx-0 xl:col-span-2">
          {showComponent && <List list={nfts} />}
        </div>
      </div>
    </>
  )
}
