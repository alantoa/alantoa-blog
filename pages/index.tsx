import { getMDXComponent } from '@/components/MDXComponents'
import { PageSEO } from '@/components/SEO'
import projectsData from '@/data/projectsData'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import Sticky from 'react-stickynode'
import { useWindowSize } from 'react-use'

import MyInfo from '@/components/MyInfo'
import ProjectItem from '@/components/ProjectItem'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter }
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])

  return { props: { authorDetails } }
}

export default function About({ authorDetails }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails
  const { name, avatar, occupation, company, companyLink, email, twitter, github, address, ens } =
    frontMatter
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  const { width } = useWindowSize()

  return (
    <>
      <PageSEO title={`${name}`} description={`About me - ${name}`} />
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <Sticky enabled={width > 1280}>
          <MyInfo authorDetails={frontMatter} />
        </Sticky>
        <div className="text-md prose max-w-none pt-8 dark:prose-dark xl:col-span-2">
          <MDXLayout />
          <h2 className="text-xl font-bold">Open Source Projects</h2>
          {projectsData.map((d) => (
            <ProjectItem
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </>
  )
}
