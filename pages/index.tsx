import AAlantoa from '@/components/icon/AAlantoa'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { FiTwitter } from 'react-icons/fi'
import { ImBlog } from 'react-icons/im'
import { MdWorkOutline } from 'react-icons/md'
import { RiGithubLine } from 'react-icons/ri'
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
        {/* <video
          src="https://player.vimeo.com/external/181445574.hd.mp4?s=d24f32d879305e931468d55e4d7ce6efb5a95c39&amp;profile_id=119"
          autoPlay
          loop
          playsInline
          muted
          className="absolute top-0 left-0 h-full w-full object-cover"
        /> */}
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-30"></div>
        <div className="relative flex h-full w-full flex-row items-center justify-center space-x-24">
          <div className="-mt-32 flex cursor-pointer select-none flex-col items-center">
            <Image
              src={frontMatter.avatar}
              alt="me"
              width="140"
              height="140"
              className="rounded-full"
            />
            <AAlantoa width={500} height={80} className="mt-8 fill-slate-50" />
            <div className="flex space-x-8 pt-6 text-2xl">
              <Link href="/blog">
                <ImBlog />
              </Link>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/alantoa">
                <RiGithubLine />
              </a>

              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/alan_toa">
                <FiTwitter />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="mailto: toacncom@gmail.com">
                <MdWorkOutline />
              </a>
            </div>
          </div>
        </div>
        <style jsx>{``}</style>
      </div>
    </>
  )
}
