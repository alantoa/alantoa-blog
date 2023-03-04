import { Button } from '@/components/Button'
import Image from '@/components/Image'
import { getMDXComponent } from '@/components/MDXComponents'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { getFileBySlug } from '@/lib/mdx'
import { formatAddress } from '@/lib/utils/formatAddress'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { RxCopy } from 'react-icons/rx'

import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const DEFAULT_LAYOUT = 'AuthorLayout'

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter }
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])

  return { props: { authorDetails } }
}

export default function About({
  authorDetails,
  ...rest
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails
  const { name, avatar, occupation, company, companyLink, email, twitter, github, address, ens } =
    frontMatter
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width={128}
              height={128}
              className="h-32 w-32 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <Button
              onClick={async () => {
                await navigator?.clipboard?.writeText(address)
                toast.success('Copied!')
              }}
              className="mt-2 flex flex-row flex-nowrap items-center justify-center rounded-md bg-gray-50 px-2 dark:bg-gray-700"
            >
              <span className="mr-2 text-sm text-gray-500 dark:text-gray-300">
                {formatAddress(address)}
              </span>
              <RxCopy className="text-gray-500 dark:text-gray-300" />
            </Button>
            {/* <div className="text-gray-500 dark:text-gray-400">{formatENS(ens)}</div> */}
            {company && companyLink && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={companyLink}
                className="text-gray-500 dark:text-gray-400"
              >
                {company}
              </a>
            )}
            <div className="flex space-x-6 pt-4">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="text-md prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            <MDXLayout />
          </div>
        </div>
      </div>
    </>
  )
}
