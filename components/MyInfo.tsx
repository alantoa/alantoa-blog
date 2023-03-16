import { Button } from '@/components/Button'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import { formatAddress } from '@/lib/utils/formatAddress'
import { toast } from 'react-hot-toast'
import { RxCopy } from 'react-icons/rx'

import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

export default function MyInfo({ authorDetails }: { authorDetails: AuthorFrontMatter }) {
  const { name, avatar, occupation, company, companyLink, email, twitter, github, address, ens } =
    authorDetails

  return (
    <div className="flex flex-col items-center space-x-2 pt-8">
      <Image
        src={avatar}
        alt="avatar"
        width={128}
        height={128}
        className="h-28 w-28 rounded-full md:h-32 md:w-32"
      />
      <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
      <Button
        onClick={async () => {
          await navigator?.clipboard?.writeText(address)
          toast.success('Copied!')
        }}
        className="flex flex-row flex-nowrap items-center justify-center rounded-md bg-gray-50 px-2 dark:bg-gray-700"
      >
        <span className="mr-2 text-sm text-gray-500 dark:text-gray-300">
          {formatAddress(address)}
        </span>
        <RxCopy className="text-gray-500 dark:text-gray-300" />
      </Button>
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
        <SocialIcon kind="twitter" href={twitter} className="h-5 w-5" />
        <SocialIcon kind="github" href={github} className="h-5 w-5" />
        <SocialIcon kind="mail" href={`mailto:${email}`} className="h-5 w-5" />
        <SocialIcon kind="eth" link="/nfts" className="h-5 w-5" />
      </div>
    </div>
  )
}
