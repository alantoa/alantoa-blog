import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  frontMatter: AuthorFrontMatter
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])
  const { frontMatter } = authorDetails
  return { props: { frontMatter } }
}

export default function Home({ frontMatter }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="relative h-screen overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-30" />
        <div className="relative flex h-full w-full flex-row items-center justify-center space-x-24">
          <div className="-mt-32 flex select-none flex-col items-center">
            <Link href="/about" className="inline-block overflow-hidden rounded-full">
              <Image src={frontMatter.avatar} alt="me" width="120" height="120" />
            </Link>
            <Link href="/blog">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M62.007 36.7175L66.9359 42.9395L38.5136 102.049L33.1937 101.638L62.007 36.7175Z" />
                <path d="M62.0295 36.7112L68.3533 40.5824L79.4437 85.3876L73.1937 87.8876L62.0295 36.7112Z" />
                <path d="M123.243 68.6312L116.342 75.6207L29.4439 109.138L33.1938 101.638L123.243 68.6312Z" />
                <path d="M76.9436 106.638L82.5686 104.138L84.4436 109.138H76.9436V106.638Z" />
                <path d="M96.1034 82.8775L99.4437 80.3877L107.457 108.968L102.931 109.081L96.1034 82.8775Z" />
              </svg>
            </Link>
            <span className="-mt-4 font-serif text-white">ALAN · TOA</span>
            <div className="flex space-x-8 pt-6 text-2xl">
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/alantoa">
                <AiFillGithub className="text-white transition duration-300 hover:text-gray-400" />
              </a>

              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/alan_toa">
                <AiOutlineTwitter className="text-white transition duration-300 hover:text-gray-400" />
              </a>
              <Link href="/nfts">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 129 129"
                  fill="currentColor"
                  className="text-white transition duration-300 hover:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28.4749 65.9339L64.3849 7.28394L100.295 65.9339L64.3849 86.8539L28.4749 65.9339Z" />
                  <path d="M64.3849 93.444L99.1449 71.864L64.3849 121.284L28.8049 71.864L64.3849 93.444Z" />
                </svg>

                {/* <ImBlog className="text-white transition duration-300 hover:text-gray-400" /> */}
              </Link>

              <a target="_blank" rel="noopener noreferrer" href="mailto: toacncom@gmail.com">
                <MdEmail className="text-white transition duration-300 hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
