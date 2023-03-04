import { Button } from '@/components/Button'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getFileBySlug } from '@/lib/mdx'
import axios from 'axios'
import Image from 'next/image'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

export async function getServerSideProps() {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { frontMatter } = authorDetails

  try {
    const { data } = await axios.get(`https://ped.ro/api/nfts/${frontMatter.address}`)

    return {
      props: {
        ...data,
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}
export default function NFTs({ nfts }) {
  console.log(nfts)
  return (
    <>
      <PageSEO title={`NFTs - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            NFTs
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {nfts?.map((item) => (
              <Button
                onClick={() => window.open(item.openSeaLink)}
                className="w-32 px-2"
                key={item.id}
              >
                <Image
                  className="h-28 w-28 rounded-md"
                  src={item.image}
                  width={120}
                  height={120}
                  alt={'NFT cover'}
                />
                <div className="mt-2 text-center text-sm font-semibold line-clamp-1">
                  {item.assetName}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
