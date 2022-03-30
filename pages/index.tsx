import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import IconFont from '@/components/iconfont'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex h-full w-full flex-row items-center justify-center space-x-24">
        <a href="https://github.com/alantoa" target="_blank" rel="noreferrer">
          <IconFont name="a-githubsquare" className="fill-black dark:fill-white" size={140} />
        </a>
        <a href="https://twitter.com/alan_toa" target="_blank" rel="noreferrer">
          <IconFont name="a-twitter" className="fill-black dark:fill-white" size={140} />
        </a>
      </div>
    </>
  )
}
