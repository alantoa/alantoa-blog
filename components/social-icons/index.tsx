import Link from 'next/link'
import { SVGAttributes, useCallback } from 'react'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import ETH from './eth.svg'
import Polygon from './polygon.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: MdEmail,
  github: AiFillGithub,
  twitter: AiOutlineTwitter,
  eth: ETH,
  polygon: Polygon,
}
type SocialIconProps<T = unknown> = SVGAttributes<T> & {
  kind?: keyof typeof components
  href?: string
  size?: number
  className?: string
  link?: string
}
const SocialIcon = ({ kind, href, size = 8, className = '', link, ...rest }: SocialIconProps) => {
  const Core = useCallback(() => {
    const SocialSvg = components[kind]
    return (
      <>
        <span className="sr-only">{kind}</span>
        <SocialSvg
          className={[
            `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`,
            className,
          ].join(' ')}
          {...rest}
        />
      </>
    )
  }, [className, kind, rest, size])

  if (
    (!href && !link) ||
    (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null
  if (link) {
    return <Link href={link}>{Core()}</Link>
  }
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {Core()}
    </a>
  )
}

export default SocialIcon
